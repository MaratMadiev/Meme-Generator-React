import React, { useState } from "react";
import useEditorStore from "../../../../store/editorStore";
import type FabricGif from "../../../../components/FabricGif";
import GIF from "gif.js";
import gifWorkerURL from 'gif.js/dist/gif.worker.js?url';

interface GiphyPopupProps {
  onClose: () => void;
}

const GiphyPopup: React.FC<GiphyPopupProps> = ({ onClose }) => {
  const [mode, setMode] = useState<"gif" | "image">("image");

  const canvas = useEditorStore((state) => state.canvas);
  const coef = useEditorStore((state) => state.canvasCoef);

  const [width, setWidth] = useState<number>(
    Math.floor((canvas?.width || 800) / coef),
  );
  const [height, setHeight] = useState<number>(
    Math.floor((canvas?.height || 600) / coef),
  );

  const [fps, setFps] = useState<number>(Math.floor(15));
  const [videoLen, setVideoLen] = useState<number>(
    useEditorStore((state) => state.gifMaxLen),
  );

  async function getBlobImageFromCanvas(w: number, h: number) {
    if (!canvas) return;

    const scaleCoef = Math.max(w / canvas.width, h / canvas.height);
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 0.9,
      multiplier: scaleCoef,
    });

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = dataURL;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;

    const ctx = tempCanvas.getContext("2d");

    ctx?.drawImage(img, 0, 0, w, h);

    const res = tempCanvas.toDataURL("image/png");

    return res;
  }

  const handleExport = async (w: number, h: number) => {
    if (!canvas) return;

    const newDataURL = await getBlobImageFromCanvas(w, h);
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = newDataURL || "";
    link.click();
  };

  const handleExportGif = async (
    w: number,
    h: number,
    fps: number,
    len: number,
  ) => {
    if (!canvas) return;
    const gifs = canvas?.getObjects("gif");

    w = Math.floor(w);
    h = Math.floor(h);

    const gifjsGif = new GIF({
      workers: 1,
      quality: 10,
      workerScript: gifWorkerURL,
    });

    gifs?.forEach((gif) => {
      const gifFabric = gif as FabricGif;
      gifFabric.stop();
    });

    const frameCount = Math.floor(fps * len);
    const delayMs = (1 / fps) * 1000;

    for (let index = 0; index < frameCount; index++) {
      const timeMs = index * delayMs;
      gifs?.forEach((gif) => {
        const gifFabric = gif as FabricGif;
        gifFabric.setSourceFromTime(timeMs);
      });
      canvas.renderAll();

      const dataUrl = await getBlobImageFromCanvas(w,h);
      if (!dataUrl) continue;

      const img: HTMLImageElement = new Image();
      img.src = dataUrl;

      await new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
      console.log(214)
      gifjsGif.addFrame(img, {delay: delayMs})

    }

    gifjsGif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      
      window.open(url);
      const link = document.createElement("a");
      link.href = url;
      link.download = "meme.gif";
      link.click();
    })

    gifjsGif.render();


    gifs?.forEach((gif) => {
      const gifFabric = gif as FabricGif;
      gifFabric.play();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[80vh] flex flex-col">
        {/* Заголовок */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">ЭКСПОРТ</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Режим экспорта */}

        <div className="py-5 px-4 flex gap-4 items-center justify-center">
          <button
            type="button"
            onClick={() => setMode("image")}
            className={`flex-1 px-3 py-3 text-white text-2xl rounded-lg transition-colors ${
              mode === "image"
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Картинки
          </button>
          <button
            type="button"
            onClick={() => setMode("gif")}
            className={`flex-1 px-3 py-3 text-white text-2xl rounded-lg transition-colors ${
              mode === "gif"
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Гифки
          </button>
        </div>

        {/* режимы */}
        <div className="p-4">
          {/*картинки*/}
          {mode === "image" && (
            <div className="space-y-4">
              <h2 className="text-md text-2xl font-semibold">
                Настройки экспорта изображения
              </h2>
              <div className="flex gap-4 justify-center">
                {/* Ширина */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ширина (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Высота */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Высота (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              {/* Кнопка экспорта */}
              <button
                type="button"
                onClick={() => handleExport(width, height)}
                className="w-full mt-4 px-4 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors"
              >
                Экспорт
              </button>
            </div>
          )}
          {/* Гифки */}
          {mode === "gif" && (
            <div className="space-y-4">
              <h2 className="text-md text-2xl font-semibold">
                Настройки экспорта изображения
              </h2>
              <div className="flex gap-4 justify-center">
                {/* Ширина */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ширина (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Высота */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Высота (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                {/* Кол-во кадров в секунду */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Кадров в секунду
                  </label>
                  <input
                    type="number"
                    value={fps}
                    onChange={(e) => setFps(Number(e.target.value))}
                    min="3"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* Длина гифки (сек.) */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Длина (в секундах)
                  </label>
                  <input
                    type="number"
                    value={videoLen}
                    onChange={(e) => setVideoLen(Number(e.target.value))}
                    min="1"
                    max="30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              {/* Кнопка экспорта */}
              <button
                type="button"
                onClick={() => handleExportGif(width, height, fps, videoLen)}
                className="w-full mt-4 px-4 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors"
              >
                Экспорт
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiphyPopup;

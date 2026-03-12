import React, { useState, useEffect } from "react";
import useEditorStore from "../../../../store/editorStore";

interface GiphyPopupProps {
  onClose: () => void;
}

const GiphyPopup: React.FC<GiphyPopupProps> = ({ onClose }) => {
  const [mode, setMode] = useState<"gif" | "image">("image");

  const canvas = useEditorStore((state) => state.canvas);
  const coef = useEditorStore((state) => state.canvasCoef);

  const [width, setWidth] = useState<number>((canvas?.width || 800) / coef);
  const [height, setHeight] = useState<number>((canvas?.height || 600) / coef);
  const [keepRatio, setKeepRatio] = useState(true);

  async function getBlobImageFromCanvas(w: number, h: number) {
    if (!canvas) return;

    const scaleCoef = Math.max(w / canvas.width, h / canvas.height);
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
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
    link.href = newDataURL || '';
    link.click();
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
            className={` flex-1 px-3 py-3 bg-gray-${mode == "image" ? 600 : 400} text-white text-2xl rounded-lg hover:bg-gray-600 active:bg-gray-700`}
          >
            Картинки
          </button>
          <button
            type="button"
            onClick={() => setMode("gif")}
            className={`flex-1 px-3 py-3 bg-gray-${mode == "gif" ? 600 : 400} text-white text-2xl  rounded-lg hover:bg-gray-600 active:bg-gray-700`}
          >
            Гифки
          </button>
        </div>

        {/* режимы */}
        <div className="p-4">
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

          {mode === "gif" && (
            <div className="text-center text-gray-500 py-8">
              {/* Здесь будет контент для гифок */}
              Режим гифок в разработке
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiphyPopup;

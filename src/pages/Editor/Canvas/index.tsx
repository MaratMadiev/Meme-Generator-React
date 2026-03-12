import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, FabricImage } from "fabric";
import useEditorStore from "../../../store/editorStore";
import FabricGif from "../../../components/FabricGif";

interface CanvasProps {
  imageUrl?: string;
  gifUrl?: string;
  len?: number;
  width: number;
  height: number;
}

const Canvas = ({ imageUrl, gifUrl, width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setCanvas = useEditorStore((state) => state.setCanvas);
  const clearCanvas = useEditorStore((state) => state.clearCanvas);

  const setCoef = useEditorStore((state) => state.setCanvasCoef) 
  const setLen = useEditorStore((state) => state.setGifMaxLen)

  const elementRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const margin = 0.95;
    const coef = margin * Math.min(rect.width / width, rect.height / height);

    const canvasW = coef * width;
    const canvasH = coef * height;
    
    setCoef(coef);

    // Создаем канвас
    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasW,
      height: canvasH,
      backgroundColor: "white",
    });

    // store
    setCanvas(canvas);

    // adaptive very unready
    /*const adaptiveResize = () => {
      if (!elementRef.current || !canvas) return;
      const rect = elementRef.current.getBoundingClientRect();
      const newCoef = margin * Math.min(rect.width / width, rect.height / height);

      const newCanvasW = newCoef * width;
      const newCanvasH = newCoef * height;

      canvas.setDimensions({
        width: newCanvasW,
        height: newCanvasH,
      });
    }; 
    */

    // listen
    //window.addEventListener("resize", adaptiveResize);

    // изображение если есть
    if (imageUrl) {
      FabricImage.fromURL(imageUrl).then((img) => {
        img.scale(coef);
        img.top = canvasH / 2;
        img.left = canvasW / 2;

        canvas.add(img);
        canvas.renderAll();
      });
    }

    if (gifUrl) {
      FabricGif.fromUrl(gifUrl).then((gif) => {
        gif.scale(coef);
        gif.top = canvasH / 2;
        gif.left = canvasW / 2;

        canvas.add(gif);
        gif.loopPlay();
        canvas.renderAll();

        setLen(gif.durationSeconds)
      })
    }

    // Очистка
    return () => {

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current = null;
      }
      canvas.dispose();
      clearCanvas();
    };
  }, [imageUrl, width, height, setCanvas, gifUrl]);

  return (
    <div
      ref={elementRef}
      className="flex items-center justify-center min-h-full"
    >
      <canvas ref={canvasRef} className="border shadow-lg" />
    </div>
  );
};

export default Canvas;

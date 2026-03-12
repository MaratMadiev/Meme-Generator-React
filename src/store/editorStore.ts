import type { Canvas } from "fabric";
import { create } from "zustand";

interface EditorStore {
  canvas: Canvas | null;

  setCanvas: (canvas: Canvas) => void;
  clearCanvas: () => void;

  fillColor: string;
  setFillColor: (color: string) => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;

  canvasCoef: number;
  setCanvasCoef: (coef: number) => void;

  gifMaxLen: number;
  setGifMaxLen : (len: number) => void;
}

const useEditorStore = create<EditorStore>((set) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),
  clearCanvas: () => set({ canvas: null }),
  
  fillColor: '#ffffff',
  setFillColor: (color) => set({ fillColor: color }),
  strokeColor: '#000000',
  setStrokeColor: (color) => set({ strokeColor: color }),

  canvasCoef: 0,
  setCanvasCoef: (coef: number) => set({canvasCoef: coef}),

  gifMaxLen: 0,
  setGifMaxLen: (len: number) => set({gifMaxLen: len})
}))

export default useEditorStore;
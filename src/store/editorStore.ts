import type { Canvas } from "fabric";
import { create } from "zustand";

interface EditorStore {
  canvas: Canvas | null;

  setCanvas: (canvas: Canvas) => void;
  clearCanvas: () => void;

  currentShape: "rect" | "circle" | "triangle";
  setCurrentShape: (shape: "rect" | "circle" | "triangle") => void;

  fillColor: string;
  setFillColor: (color: string) => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
}

const useEditorStore = create<EditorStore>((set) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),
  clearCanvas: () => set({ canvas: null }),
  
  currentShape: 'rect',
  setCurrentShape: (shape) => set({ currentShape: shape }),
  
  fillColor: '#ffffff',
  setFillColor: (color) => set({ fillColor: color }),
  strokeColor: '#000000',
  setStrokeColor: (color) => set({ strokeColor: color })
}))

export default useEditorStore;
import { useState } from "react";
import useEditorStore from "../../../store/editorStore";
import TextTool from "./TextTool";
import ShapeTool from "./ShapeTool";
import ImageTool from "./ImageTool";

const Toolbar = () => {
  const [showColors, setShowColors] = useState(false);

  const canvas = useEditorStore((state) => state.canvas);

  const fillColor = useEditorStore((state) => state.fillColor);
  const strokeColor = useEditorStore((state) => state.strokeColor);
  const setFillColor = useEditorStore((state) => state.setFillColor);
  const setStrokeColor = useEditorStore((state) => state.setStrokeColor);

  const handleExport = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="w-16 bg-white border-r flex flex-col items-center py-4 space-y-4">
      <TextTool />
      <ShapeTool />
      <ImageTool />

      <div className="w-8 border-t border-gray-200"></div>

      {/* Colors preview */}
      <button
        onClick={() => setShowColors(!showColors)}
        className={`w-10 h-10 rounded-lg border-6`}
        style={{ backgroundColor: fillColor, borderColor: strokeColor }}
        title="Цвет заливки"
      />

      {showColors && (
        <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 z-20">
          <div className="space-y-2">
            <label className="block text-sm">Цвет заливки</label>
            <input
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
              className="w-full"
            />
            <label className="block text-sm mt-2">Цвет обводки</label>
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* экспорт */}
      <button
        onClick={handleExport}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
        title="Скачать PNG"
      >
        <span className="text-2xl">💾</span>
      </button>

      <div className="w-8 border-t border-gray-200"></div>
    </div>
  );
};

export default Toolbar;

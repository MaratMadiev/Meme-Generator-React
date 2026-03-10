import { useState } from 'react';
import useEditorStore from '../../../store/editorStore';
import TextTool from './TextTool';
import ShapeTool from './ShapeTool';
import ImageTool from './ImageTool';

const Toolbar = () => {
  const [showColors, setShowColors] = useState(false);

  const fillColor = useEditorStore((state) => state.fillColor);
  const strokeColor = useEditorStore((state) => state.strokeColor);
  const setFillColor = useEditorStore((state) => state.setFillColor);
  const setStrokeColor = useEditorStore((state) => state.setStrokeColor);

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
        style={{ backgroundColor: fillColor, borderColor: strokeColor}}
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
    </div>
  );
};

export default Toolbar;
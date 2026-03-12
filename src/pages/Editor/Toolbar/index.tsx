import { useState } from "react";
import useEditorStore from "../../../store/editorStore";
import TextTool from "./TextTool";
import ShapeTool from "./ShapeTool";
import ImageTool from "./ImageTool";
import GiphyPopup from "./GiphyPopup";
import logo from "../../../assets/gif.png";
import logoPaint from "../../../assets/logoPaint.png";
import logoPaint2 from "../../../assets/logoPaintClose.png";
import SavePopup from "./SavePopup";

const Toolbar = () => {
  const [currentPopup, setCurrentPopup] = useState<'save' | 'color' | 'giphy' | 'none'>('none')

  const canvas = useEditorStore((state) => state.canvas);

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

      <button
        onClick={() => setCurrentPopup('giphy')}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
        title="Выбрать Гифку"
      >
        <img src={logo} className="w-9 h-9" />
      </button>

      <div className="w-8 border-t border-gray-200"></div>

      {/* Colors preview */}
      <button
        onClick={() => {
          if (currentPopup == 'color') setCurrentPopup('none')
          else setCurrentPopup('color');
        }}
        className={`w-10 h-10 rounded-lg border-6`}
        style={{ backgroundColor: fillColor, borderColor: strokeColor }}
        title="Цвет заливки"
      >
        <img src={currentPopup == 'color' ? logoPaint2 : logoPaint } className="w-7 h-7" />
      </button>

      {currentPopup == 'color' && (
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
        onClick={() => setCurrentPopup('save')}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
        title="Скачать PNG"
      >
        <span className="text-2xl">💾</span>
      </button>

      <div className="w-8 border-t border-gray-200"></div>

      {currentPopup == 'giphy' && (
        <GiphyPopup
          onClose={() => setCurrentPopup('none')}
        />
      )}

      {currentPopup == 'save' && (
        <SavePopup
          onClose={() => setCurrentPopup('none')}
        />
      )}

    
    </div>
  );
};

export default Toolbar;

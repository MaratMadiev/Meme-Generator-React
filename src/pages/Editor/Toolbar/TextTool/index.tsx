import useEditorStore from '../../../../store/editorStore';
import { Textbox } from 'fabric';
import logo from "../../../../assets/text.png";

const TextTool = () => {
  const canvas = useEditorStore((state) => state.canvas);
  const fillColor = useEditorStore((state) => state.fillColor);
  const strokeColor = useEditorStore((state) => state.strokeColor);

  const addText = () => {
    if (!canvas) return;

    const text = new Textbox('Вставьте текст', {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 50,
      fontFamily: 'Impact',
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 3,
      textAlign: 'center',
    });
    

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  return (
    <button
      onClick={addText}
      className="p-2 rounded-lg hover:bg-gray-100 transition"
      title="Добавить текст"
    >
      <img src={logo} className="w-9 h-9" />
    </button>
  );
};

export default TextTool;
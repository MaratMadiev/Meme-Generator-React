import { useState } from 'react';
import { Rect, Circle, Triangle } from 'fabric';
import useEditorStore from '../../../../store/editorStore';
import logo from "../../../../assets/shapes.png";

export const shapes = [
  { id: 'rect', label: 'Прямоугольник', component: Rect },
  { id: 'circle', label: 'Круг', component: Circle },
  { id: 'triangle', label: 'Треугольник', component: Triangle },
];

const ShapeTool = () => {
  const [open, setOpen] = useState(false);
  const canvas = useEditorStore((state) => state.canvas);
  const fillColor = useEditorStore((state) => state.fillColor);
  const strokeColor = useEditorStore((state) => state.strokeColor);

  const addShape = (shapeId: string) => {
    if (!canvas) return;

    let shape;
    const commonProps = {
      left: 100,
      top: 100,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2,
    };

    switch (shapeId) {
      case 'rect':
        shape = new Rect({
          ...commonProps,
          width: 100,
          height: 100,
        });
        break;
      case 'circle':
        shape = new Circle({
          ...commonProps,
          radius: 50,
        });
        break;
      case 'triangle':
        shape = new Triangle({
          ...commonProps,
          width: 100,
          height: 100,
        });
        break;
    }

    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
        title="Добавить фигуру"
      >
        <img src={logo} className="w-9 h-9" />
      </button>

      {open && (
        <div className="absolute left-full ml-2 top-0 bg-white rounded-lg shadow-xl py-2 z-20 min-w-[150px]">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => addShape(shape.id)}
              className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-3"
            >
              <span>{shape.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShapeTool;
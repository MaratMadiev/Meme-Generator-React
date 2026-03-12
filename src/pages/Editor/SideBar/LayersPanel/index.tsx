import { useEffect, useState } from "react";
import useEditorStore from "../../../../store/editorStore";
import type { FabricObject, FabricText } from "fabric";

import up from "../../../../assets/up.png";
import dwn from "../../../../assets/down.png";
import trsh from "../../../../assets/trash.png";

const LayersPanel = () => {
  const canvas = useEditorStore((state) => state.canvas);
  const [objects, setObjects] = useState<FabricObject[]>([]);
  const [selection, setSelection] = useState<FabricObject | null>(null);

  useEffect(() => {
    if (!canvas) return;

    const updateObjs = () => {
      const cObjs = canvas.getObjects();
      setObjects([...cObjs].reverse());

      setSelection(canvas.getActiveObject() || null);
    };

    updateObjs();
    canvas.on("object:added", updateObjs);
    canvas.on("object:removed", updateObjs);
    canvas.on("selection:created", updateObjs);
    canvas.on("selection:updated", updateObjs);
    canvas.on("selection:cleared", () => setSelection(null));

    return () => {
      canvas.off("object:added", updateObjs);
      canvas.off("object:removed", updateObjs);
      canvas.off("selection:created", updateObjs);
      canvas.off("selection:updated", updateObjs);
      canvas.off("selection:cleared", () => setSelection(null));
    };
  }, [canvas]);
  function getObjectName(obj: FabricObject) {
    if (obj.type === "textbox") {
      const txt = obj as FabricText;
      return `Текст "${txt.text?.slice(0, 10)}..."` || "Текст";
    } else {
      return typeToText(obj.type) || "Объект";
    }
  }

  function deleteObject(obj: FabricObject) {
    if (!canvas) return;
    canvas.remove(obj);
    canvas.renderAll();
  }

  function moveLayer(index: number, dir: "up" | "down") {
    if (!canvas) return;
    if (dir == "up" && index > 0) {
      canvas.bringObjectForward(objects[index]);
    } else if (dir == "down" && index < objects.length - 1) {
      canvas.sendObjectBackwards(objects[index]);
    }

    setObjects([...canvas.getObjects()].reverse());
  }

  return (
    <div className="flex-1 overflow-auto">
      <h3 className="font-bold mb-2">Слои</h3>
      <div className="space-y-2">
        {
          objects.length == 0
          ?
          <div className="text-gray-500 text-sm text-center py-4">
          Объектов нет
          </div>
          :
          /* Список */
          objects.map((obj, index) => (
            <div
              onClick={() => {
                setSelection(obj);
                canvas?.setActiveObject(obj)
                canvas?.renderAll();
              }}  

              className={`
              flex items-center justify-between p-2 rounded-lg cursor-pointer
              ${
                obj == selection
                ? "bg-blue-50 border border-blue-200"
                : "bg-gray-50 hover:bg-gray-100"
              }
            `}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-sm font-medium truncate">
                  {getObjectName(obj)}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {/* Кнопка вверх */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLayer(index, "up");
                  }}
                  className="p-1 hover:bg-white rounded text-sm"
                  title="Поднять выше"
                >
                  <img src={up} alt="Удалить" className="w-4 h-4" />
                </button>

                {/* Кнопка вниз */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLayer(index, "down");
                  }}
                  className="p-1 hover:bg-white rounded text-sm"
                  title="Опустить ниже"
                >
                  <img src={dwn} alt="Удалить" className="w-4 h-4" />
                </button>

                {/* Кнопка удаления */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteObject(obj);
                  }}
                  className="p-1 hover:bg-white rounded text-sm text-red-500"
                  title="Удалить"
                >
                  <img src={trsh} alt="Удалить" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default LayersPanel;

function typeToText(type: string) {
  switch (type) {
    case 'image': return 'Картинка'
    case 'circle': return 'Круг'
    case 'rect': return 'Прямоугольник'
    case 'triangle': return 'Треугольник'
    case 'gif': return 'Гифка'
    default: return 'Объект'  
  }
}



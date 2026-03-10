import { useEffect, useState } from 'react';
import { FabricObject, FabricText } from 'fabric';
import useEditorStore from '../../../../store/editorStore';

const AVAILABLE_FONTS = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Verdana", label: "Verdana" },
  { value: "Impact", label: "Impact" },

  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Lobster", label: "Lobster" },
  { value: "Papyrus", label: "Papyrus" },
];

const PropertiesPanel = () => {
  const canvas = useEditorStore((state) => state.canvas);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);

  const [, setRenderKey] = useState(0); // мне за это очень стыдно но я хз как по другому вызывать ререндер

  // Следим за выделением
  useEffect(() => {
    if (!canvas) return;

    const updateSelection = () => {
      const active = canvas.getActiveObject();
      setSelectedObject(active || null);

      setRenderKey(prev => prev + 1); 
    };

    canvas.on('selection:created', updateSelection);
    canvas.on('selection:updated', updateSelection);
    canvas.on('selection:cleared', () => setSelectedObject(null));

    return () => {
      canvas.off('selection:created', updateSelection);
      canvas.off('selection:updated', updateSelection);
      canvas.off('selection:cleared', () => setSelectedObject(null));
    };
  }, [canvas]);

  // Функция обновления свойств
  const updateProperty = (key: string, value: any) => {
    if (!selectedObject || !canvas) return;
    
    selectedObject.set(key, value);
    canvas.renderAll();

    setRenderKey(prev => prev + 1); 
  };

  // Если ничего не выбрано
  if (!selectedObject) {
    return (
      <div className="flex-1 overflow-auto">
        <h3 className="font-bold mb-4">Свойства</h3>
        <div className="text-gray-500 text-sm text-center py-4">
          Ничего не выбрано
        </div>
      </div>
    );
  }

  // Общие свойства для всех объектов
  return (
    <div className="flex-1 overflow-auto">
      <h3 className="font-bold mb-4">Свойства</h3>

      <div className="space-y-4">
        {/* Тип объекта */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Тип</label>
          <div className="text-sm font-medium capitalize">
            {selectedObject.type === "text"
              ? "Текст"
              : selectedObject.type === "rect"
                ? "Прямоугольник"
                : selectedObject.type === "circle"
                  ? "Круг"
                  : selectedObject.type === "triangle"
                    ? "Треугольник"
                    : selectedObject.type === "image"
                      ? "Изображение"
                      : selectedObject.type}
          </div>
        </div>

        {/* Позиция */}
        <div>
          <label className="block text-xs text-gray-500 mb-2">Позиция</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs text-gray-400 block">X</span>
              <input
                type="number"
                value={Math.round(selectedObject.left || 0)}
                onChange={(e) =>
                  updateProperty("left", parseInt(e.target.value) || 0)
                }
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>
            <div>
              <span className="text-xs text-gray-400 block">Y</span>
              <input
                type="number"
                value={Math.round(selectedObject.top || 0)}
                onChange={(e) =>
                  updateProperty("top", parseInt(e.target.value) || 0)
                }
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>
          </div>
        </div>

        {/* Цвет заливки (не для image) */}
        {selectedObject.type !== "image" && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Цвет заливки
            </label>
            <input
              type="color"
              value={selectedObject.fill?.toString() || "#000000"}
              onChange={(e) => updateProperty("fill", e.target.value)}
              className="w-full h-8"
            />
          </div>
        )}

        {/* Прозрачность */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Прозрачность {Math.round((selectedObject.opacity || 1) * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={selectedObject.opacity || 1}
            onChange={(e) =>
              updateProperty("opacity", parseFloat(e.target.value))
            }
            className="w-full"
          />
        </div>

        {/* Свойства для текста */}
        {selectedObject.type === "textbox" && (
          <>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Текст</label>
              <input
                type="text"
                value={(selectedObject as FabricText).text || ""}
                onChange={(e) => updateProperty("text", e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Размер шрифта
              </label>
              <input
                type="number"
                value={(selectedObject as FabricText).fontSize || 30}
                onChange={(e) =>
                  updateProperty("fontSize", parseInt(e.target.value) || 1)
                }
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Шрифт</label>
              <select
                value={(selectedObject as FabricText).fontFamily || "Arial"}
                onChange={(e) => updateProperty("fontFamily", e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded"
              >
                {AVAILABLE_FONTS.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Обводка текста
              </label>
              <input
                type="color"
                value={selectedObject.stroke?.toString() || "#000000"}
                onChange={(e) => updateProperty("stroke", e.target.value)}
                className="w-full h-8"
              />

              <label className="block text-xs text-gray-500 mt-2 mb-1">
                Толщина обводки
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={(selectedObject as FabricText).strokeWidth || 0}
                onChange={(e) =>
                  updateProperty("strokeWidth", parseFloat(e.target.value))
                }
                className="w-full"
              />
            </div>
          </>
        )}

        {/* Свойства для фигур */}
        {["rect", "circle", "triangle"].includes(selectedObject.type || "") && (
          <>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Цвет обводки
              </label>
              <input
                type="color"
                value={selectedObject.stroke?.toString() || "#000000"}
                onChange={(e) => {
                  updateProperty("stroke", e.target.value);
                }}
                className="w-full h-8"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Толщина обводки
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={selectedObject.strokeWidth || 1}
                onChange={(e) =>
                  updateProperty("strokeWidth", parseInt(e.target.value) || 0)
                }
                className="w-full px-2 py-1 text-sm border rounded"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
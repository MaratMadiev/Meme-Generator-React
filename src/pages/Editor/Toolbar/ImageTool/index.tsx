import { useRef } from "react";
import { FabricImage } from "fabric";
import useEditorStore from "../../../../store/editorStore";
import logo from "../../../../assets/image.png";

const ImageTool = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvas = useEditorStore((state) => state.canvas);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    const imageUrl = URL.createObjectURL(file);

    FabricImage.fromURL(imageUrl).then((img) => {
      // Масштабируем если слишком большое
      const maxSizeW = canvas.getWidth();
      const maxSizeH = canvas.getHeight();

      if (img.width! > maxSizeW || img.height! > maxSizeH) {
        const scale = Math.min(maxSizeW / img.width!, maxSizeH / img.height!);
        img.scale(scale);
      }

      img.top = maxSizeH / 2;
      img.left = maxSizeW / 2;

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      URL.revokeObjectURL(imageUrl);
    });

    e.target.value = "";
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
        title="Добавить картинку"
      >
        <img src={logo} className="w-9 h-9" />
      </button>
    </>
  );
};

export default ImageTool;

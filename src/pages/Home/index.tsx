import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useRef, type ChangeEvent } from "react";

const Home = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ): void {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        navigate("/editor", {
          state: {
            imageUrl,
            fileName: file.name,
            imageWidth: img.width,
            imageHeight: img.height,
          },
        });
      };

      img.onerror = () => {
        console.error("Ошибка загрузки изображения");
        URL.revokeObjectURL(imageUrl);
        alert("Не удалось загрузить изображение");
      };
      img.src = imageUrl;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-150">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <header className="py-5 px-5">
        <div className="flex justify-center">
          <div className="flex items-center gap-10">
            <img src={logo} alt="лучший сайт в мире" className="w-20 h-auto" />
            <h1 className="text-4xl font-bold text-gray-600 mb-2">
              Генератор мемов (по ржать)
            </h1>
          </div>
        </div>
        <p className="text-2xl text-gray-600 py-5">
          Создавай мемы с нуля или загружай свои изображения
        </p>
      </header>

      {/*BODY*/}

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* IMAGE */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
            <div className="text-5xl mb-4 text-center">🖼️</div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Своя картинка
            </h2>
            <div className="text-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Выбрать файл
              </button>
            </div>
          </div>

          {/* GIF */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
            <div className="text-5xl mb-4 text-center">🖼️</div>
            <h2 className="text-2xl font-semibold text-center mb-4">Гифка</h2>
            <div className="text-center">
              <button
                onClick={() => navigate("/gif")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Выбрать гифку
              </button>
            </div>
          </div>

          {/* FROM SCRATCH */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
            <div className="text-5xl mb-4 text-center">✨</div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Чистый лист
            </h2>
            <div className="text-center">
              <button
                onClick={() => navigate("/new")}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Выбрать размер
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

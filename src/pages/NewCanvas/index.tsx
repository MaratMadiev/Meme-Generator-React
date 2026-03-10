import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewCanvas = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    navigate('/editor', {
      state: {
        mode: 'new',
        width,
        height
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2">
          Чистый лист
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Сделай самый ржачьный мем в жизни...
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ширина (px)
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              min="100"
              max="2000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Высота (px)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min="100"
              max="2000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Назад
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Создать
            </button>
          </div>
        </form>

        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-3 text-center">
            Быстрые размеры
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { w: 800, h: 600, label: '800x600' },
              { w: 1024, h: 768, label: '1024x768' },
              { w: 1280, h: 720, label: 'HD' },
              { w: 1920, h: 1080, label: 'Full HD' },
              { w: 1080, h: 1080, label: '1:1' },
              { w: 720, h: 1280, label: 'Stories' },
            ].map(preset => (
              <button
                key={preset.label}
                onClick={() => {
                  setWidth(preset.w);
                  setHeight(preset.h);
                }}
                className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCanvas;
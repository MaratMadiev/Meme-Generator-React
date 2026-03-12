import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGiphy } from '../../components/Giphy/useGiphy';

const GiphyPicker = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const { gifs, loading, error, searchGifs, getTrending } = useGiphy();

  useEffect(() => {
    getTrending(); // Загружаем популярные при открытии
  }, []);

  const handleSelectGif = (mp4Url: string, width: string, height: string) => {
    
    navigate('/editor', {
      state: {
        gifUrl: mp4Url,
        mode: 'gif',
        imageWidth: parseInt(width),
        imageHeight: parseInt(height),
        
      }
      
    });
  };

  const handleSearch = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchGifs(searchInput);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Шапка */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            На главную
          </button>
          <h1 className="text-xl font-bold text-gray-600">Выбор гифки</h1>
          <div className="w-20"></div> {/* для центрирования */}
        </div>
      </div>

      {/* Поиск */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Найди гифку..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 font-medium"
          >
            Поиск
          </button>
          <button
            type="button"
            onClick={() => getTrending()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            Тренды
          </button>
        </form>

        {/* Результаты */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Загрузка гифок...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && gifs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Ничего не найдено. Попробуй другой запрос или посмотри тренды.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gifs.map((gif) => (
            <div
              key={gif.id}
              onClick={() => handleSelectGif(gif.images.original.url, gif.images.original.width, gif.images.original.height)}
              className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={gif.images.fixed_width.url}
                alt={gif.title || 'GIF'}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <p className="text-sm text-gray-600 truncate">
                  {gif.title || 'Без названия'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Нажми чтобы выбрать</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiphyPicker;
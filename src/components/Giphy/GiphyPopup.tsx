import React, { useState, useEffect } from 'react';
import type { GiphyGif } from './GiphyAPI';
import { useGiphy } from './useGiphy';

interface GiphyPopupProps {
  onClose: () => void;
  onSelect: (mp4Url: string) => void; 
}

const GiphyPopup: React.FC<GiphyPopupProps> = ({ onClose, onSelect }) => {
  const [searchInput, setSearchInput] = useState('');
  const { gifs, loading, error, searchGifs, getTrending } = useGiphy();

  
  useEffect(() => {
    getTrending();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchGifs(searchInput);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[80vh] flex flex-col">
        {/* Заголовок */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">Выбрать гифку</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Поиск */}
        <div className="p-4 border-b">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Поиск гифок..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-purple-300"
            >
              Поиск
            </button>
            <button
              type="button"
              onClick={() => getTrending()}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Тренды
            </button>
          </form>
        </div>

        {/* Сетка гифок */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Загрузка...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && gifs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Найди гифку или посмотри популярные
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {gifs.map((gif: GiphyGif) => (
              <div
                key={gif.id}
                onClick={() => onSelect(gif.images.fixed_width.mp4)}
                className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={gif.images.fixed_width.url}
                  alt={gif.title || 'GIF'}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm text-gray-600 truncate">
                    {gif.title || 'Без названия'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiphyPopup;
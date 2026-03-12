
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Sidebar from './SideBar';
import { useEffect } from 'react';
import useEditorStore from '../../store/editorStore';

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl, gifUrl, imageWidth, imageHeight } = location.state || {};
  const canvas = useEditorStore((state) => state.canvas)

  useEffect(() => {
    const handleBeforeUnload = (event: Event) => {
      event.preventDefault();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [])

    useBlocker(({ currentLocation, nextLocation }) => {
    if (currentLocation.pathname === nextLocation.pathname) return false;
    if (canvas?.getObjects().length == 0) return false;
    return !window.confirm('У вас есть несохраненные изменения. Точно уйти?');
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Шапка */}
      <div className="bg-gray-150 shadow-sm w-full flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            На главную
          </button>
          <h1 className="text-xl font-bold text-gray-600">Редактор</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Основной контент - занимает оставшееся место */}
      <div className="flex flex-1 min-h-0">
        {/* Тулбар слева */}
        <Toolbar />

        {/* Канвас по центру */}
        <div className="flex-1 p-6 overflow-auto">
          <Canvas
            imageUrl={imageUrl}
            gifUrl={gifUrl}
            width={imageWidth || 800}
            height={imageHeight || 600}
          />
        </div>

        {/* Сайдбар справа */}
        <Sidebar />
      </div>
    </div>
  );
};

export default Editor;
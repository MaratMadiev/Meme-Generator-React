
import { useLocation, useNavigate } from 'react-router-dom';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Sidebar from './SideBar';

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl, gifUrl, imageWidth, imageHeight } = location.state || {};

  return (
    
   <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Шапк */}
      <div className="bg-gray-150 shadow-sm w-full">
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

      {/* тулбар */}
      <div className="flex flex-1">
        <Toolbar />
        
        <div className="flex-1 flex flex-col p-6">
          <div className="flex-1 ">
            <Canvas
              imageUrl={imageUrl}
              gifUrl={gifUrl}
              width={imageWidth || 800}
              height={imageHeight || 600}
            />
          </div>
        </div>
        
        <Sidebar />
      </div>
    </div>
  );
};

export default Editor;
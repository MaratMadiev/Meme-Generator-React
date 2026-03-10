
import { useLocation } from 'react-router-dom';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Sidebar from './SideBar';

const Editor = () => {
  const location = useLocation();
  const { imageUrl, gifUrl, imageWidth, imageHeight } = location.state || {};


  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Toolbar />
      
      <div className="flex-1 flex flex-col  overflow-hidden p-6">
        <div className="flex-1 overflow-hidden">
          <Canvas 
            imageUrl={imageUrl}
            gifUrl={gifUrl}
            width={imageWidth || 800}
            height={imageHeight || 600}
          />
        </div>
      </div>
      <Sidebar/>
    </div>
  );
};

export default Editor;
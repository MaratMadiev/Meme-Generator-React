import LayersPanel from './LayersPanel';
import PropertiesPanel from './PropertiesPanel';

const Sidebar = () => {
  return (
    <div className="w-72 bg-white border-l h-full flex flex-col p-4">
      {/* СЛОИ */}
      <LayersPanel/>

      {/* сепаратор */}
      <div className="border-t my-4"></div>

      {/* СВОЙСТВА */}
      <PropertiesPanel/>
    </div>
  );
};

export default Sidebar;
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Editor from './pages/Editor'
import NewCanvas from './pages/NewCanvas';
import { NotFound } from './pages/NotFound';
import GiphyPicker from './pages/GiphyPicker';

function App() {

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "/new",
    element: <NewCanvas />,
  },
  {
    path: "/gif",
    element: <GiphyPicker />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

  return (
    <div className='h-screen overflow-hidden'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Editor from './pages/Editor'
import NewCanvas from './pages/NewCanvas';
import { NotFound } from './pages/NotFound';
import GiphyPicker from './pages/GiphyPicker';

function App() {

  return (
    <div className='h-screen overflow-hidden'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/new" element={<NewCanvas />} />
          <Route path="/gif" element={<GiphyPicker />} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App

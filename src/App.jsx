// import './App.css'
import './style/Style.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './components/Card';
import GenreList from './components/Genre';

import { Home } from './pages/Home';

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Card/:id" element={<Cards />} />
          <Route path="/Genre/:id" element={<GenreList />} />
        </Routes>
      </div>
  )
};

export default App



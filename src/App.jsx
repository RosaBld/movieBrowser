// import './App.css'
import './style/Style.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './pages/Card';
import GenreList from './components/Genre';
import { NavBar} from './components/NavBar';
import { ListGenres } from './pages/ListGenres';

import { Home } from './pages/Home';

function App() {
  return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Card/:id" element={<Cards />} />
          <Route path="/Genre/:id" element={<GenreList />} />
          <Route path="/ListGenres/" element={<ListGenres />} />
        </Routes>
      </div>
  )
};

export default App



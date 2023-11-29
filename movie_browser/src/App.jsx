import './App.css'
import MovieList from './components/Movies';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './components/Card';

function App() {
  return (
      <div>
        <h1>Movies:</h1>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/Card/:id" element={<Cards />} />
        </Routes>
      </div>
  )
};

export default App



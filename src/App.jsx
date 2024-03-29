import './css/Style.css'

import { Route, Routes, useLocation } from 'react-router-dom';
import GenreList from './pages/Genre';
import { NavBar} from './components/NavBar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { ResultsPage } from './pages/Results';
import { Contact } from './components/Contact';
import { useState, useEffect } from 'react';
import { ResultWatchList } from './pages/ResultWatchList';
import { ResultFavoriteMovies } from './pages/ResultFavoritesList';

import { useLoginSession } from './utilities/LogginSession';

function App() {
  const location= useLocation();

  const { isLoggedIn, setIsLoggedIn, user, setUser } = useLoginSession();

  const [sessionId, setSessionId] = useState(null);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const storedSessionId = sessionStorage.getItem('sessionId');
    const storedAccountId = sessionStorage.getItem('accountId');

    setSessionId(storedSessionId);
    setAccountId(storedAccountId);

    setIsLoggedIn(!!storedSessionId && !!storedAccountId);
  }, [setIsLoggedIn]);


  return (
    <div>
      <NavBar key={location.pathname} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home sessionId={sessionId} accountId={accountId} />} />
        <Route path="/Genre/:id" element={<GenreList />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/watchlist" element={<ResultWatchList isLoggedIn={isLoggedIn} />} />
        <Route path="/favorites" element={<ResultFavoriteMovies isLoggedIn={isLoggedIn} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
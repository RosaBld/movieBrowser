import { Link, useNavigate } from 'react-router-dom';
import { Genre } from '../utilities/request';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { Login } from './Login';

import PropTypes from 'prop-types';

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export function NavBar({ isLoggedIn, setIsLoggedIn, user, setUser }) {

    const [genres, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getGenres = async () => {
            const result = await Genre();
            setGenre(result);
        }

        getGenres();
    }, []);

    const handleGenreChange=(event) => {
        const genreId=event.target.value;
        setSelectedGenre(genreId);
        
        if (genreId==="") {
            navigate('/');
        } else {
            navigate(`Genre/${genreId}`);
        }
        window.scrollTo(0, 0);
    }

    const handleListchange = (event) => {
        const value = event.target.value;
        if (value === "watchlist") {
            navigate('/watchlist');
        } else if (value === "favorites") {
            navigate('/favorites');
        } else {
            navigate('/');
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleClick= () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="navbar">
            <nav>
                <div className="menu-container">
                    <button className="burger" onClick={() => setIsOpen(!isOpen)}>
                        <img className="burgerLogo" src='/logoTMDB.svg' alt='logo_TMBD' />
                    </button>

                    <div className="navigation">
                        <ul className={`listnav ${isOpen ? 'open' : ''}`}>
                            <li>
                                <Link to='/' onClick={handleClick}>
                                    {isOpen ? 
                                        <p>Acceuil</p>
                                        :
                                        <img className="navbarlogo" src='/logoTMDB.svg' alt='logo_TMBD' /> 
                                    }
                                </Link>
                            </li>
                            <li>
                                <select onChange={handleListchange} className="selectGenres">
                                    <option className="choose" value="">- My Lists -</option>
                                    <option className="choose" value="watchlist">WatchList</option>
                                    <option className="choose" value="favorites">Favorites</option>
                                </select>
                            </li>
                            <li>
                                <select onChange={handleGenreChange} value={selectedGenre} className="selectGenres">
                                    <option className="choose" value="">- Select genres -</option>
                                    {genres.genres && genres.genres.map((genre) =>
                                        <option className="choose" key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </option>
                                    )}
                                </select>
                            </li>
                            <li>
                                <Login 
                                    isLoggedIn={isLoggedIn} 
                                    setIsLoggedIn={setIsLoggedIn} 
                                    user={user} 
                                    setUser={setUser} 
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <SearchBar />
            </nav>
        </div>
    )
}
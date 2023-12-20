import { React } from 'react';
import { Link } from 'react-router-dom';
import { ListGenres } from '../pages/ListGenres';

export function NavBar() {
    return (
        <div className="navbar">
            <nav>
                <div className='listnav'>
                    <ul>
                        <li>
                            <Link to='/'>
                                <img className="navbarlogo" src='/logoTMDB.svg' alt='logo_TMBD'></img>
                            </Link>
                        </li>
                        <li>
                            <Link to='/'>
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link to='/'>
                                My List
                            </Link>
                        </li>
                        <li>
                            <Link to='/ListGenres'>
                                Genres
                            </Link>
                        </li>
                        <li>
                            <Link to='/'>
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom";
import { Login } from "./Login";
import PropTypes from 'prop-types';

export function Footer({ setIsLoggedIn, isLoggedIn, setUser, user }) {

    const handleClick= () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="footer">
            <ul className="socialNetwork">
                <li className="listNet">
                    <a href="https://www.facebook.com/themoviedb/?locale=fr_FR" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faSquareFacebook} className="fa" />
                    </a>
                </li>
                <li className="listNet">
                    <a href="https://twitter.com/themoviedb" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faSquareXTwitter} className="fa" />
                    </a>
                </li>
                <li className="listLogo">
                    <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                        <img className="footerLogo" src='/logoFooter.svg' alt='logo_TMBD' />
                    </a>
                </li>
            </ul>

            <div className="links">
                <ul className="use">
                    <li>
                        <a href="https://www.themoviedb.org/terms-of-use" target="_blank" rel="noopener noreferrer">
                            <p>
                                Terms of use    
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.themoviedb.org/api-terms-of-use" target="_blank" rel="noopener noreferrer">
                            <p>
                                Terms of use - API   
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="https://developer.themoviedb.org/docs/faq" target="_blank" rel="noopener noreferrer">
                            <p>
                                About TMDB API   
                            </p>
                        </a>
                    </li>
                </ul>
                <ul className="aboutDev">
                    <li>
                        <a href="https://portfolio-boulard.vercel.app/" target="_blank" rel="noopener noreferrer">
                            <p>
                                About the dev   
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/RosaBld" target="_blank" rel="noopener noreferrer">
                            <p>
                                Git of the dev   
                            </p>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/RosaBld/movieBrowser" target="_blank" rel="noopener noreferrer">
                            <p>
                                Github 
                            </p>
                        </a>
                    </li>
                </ul>
                <ul className="account">
                    <li className="loginFooter">
                    <Login 
                        displayName={isLoggedIn ? 'Profile' : 'Login'}
                        isLoggedIn={isLoggedIn} 
                        setIsLoggedIn={setIsLoggedIn} 
                        user={user} 
                        setUser={setUser} 
                    />
                    </li>
                    <li>
                        <Link to='/contact' onClick={handleClick}>
                            <p>
                                Contact Us
                            </p>
                            
                        </Link>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

Footer.propTypes = {
    isLoggedIn: PropTypes.bool,
    setIsLoggedIn: PropTypes.func,
    user: PropTypes.object,
    setUser: PropTypes.func,
  };
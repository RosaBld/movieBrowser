import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { RequestToken, CreateSession, ValidateToken, GetAccountDetails } from '../utilities/request';
import PropTypes from 'prop-types';

export function Login() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = await RequestToken();
            setToken(token);

            sessionStorage.setItem('token', token);

            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=https://movie-browser-mocha.vercel.app/`;

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);
    }, []);

    const handleValidationSubmit = async (event) => {
        event.preventDefault();

        if (username.length < 3) {
            alert('Username must be at least 3 characters long.');
            return;
        }
    
        if (password.length < 4) {
            alert('Password must be at least 4 characters long.');
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            setToken(token);
            const validatedToken = await ValidateToken(token, username, password);

            if (!validatedToken) {
                console.error('Token validation failed');
                return;
            }

            const sessionId = await CreateSession(token);

            sessionStorage.removeItem('token');
            sessionStorage.setItem('sessionId', sessionId);
            console.log(sessionId);
            console.log('storedSessionId after login:', sessionStorage.getItem('sessionId'));
    
            const accountDetails = await GetAccountDetails(sessionId);
            sessionStorage.setItem('accountId', accountDetails.id);
            console.log('storedAccountId after login:', sessionStorage.getItem('accountId'));
    
            setIsLoggedIn(true);
            setUser(accountDetails);
    
            closeModal();
    
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        const sessionId = sessionStorage.getItem('sessionId');
        if (sessionId) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        
        sessionStorage.removeItem('sessionId');
        sessionStorage.removeItem('requestToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
    
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <button onClick={openModal} className="login">Profile</button>
                    <Modal 
                        isOpen={modalIsOpen} 
                        onRequestClose={closeModal} 
                        contentLabel="Authentication Modal"
                        style={{
                            overlay: {
                                zIndex: 9999,
                                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            },
                            content: {
                                background: '#0d253f',
                                width: '55%',
                                height: '65%', 
                                margin: 'auto', 
                                padding: '20px', 
                                border: '1px solid lightsteelblue', 
                                borderRadius: '4px', 
                                overflow: 'auto',
                            },
                        }}
                    >
                        <div className="profileInformations">
                            <h2 className="titleProfile">Profile</h2>
                            <h3 className="welcomeBack">Hey! Welcome back <FontAwesomeIcon icon={faFaceSmile} style={{color: "#ffffff",}} /></h3>
                            {user && (
                                <>
                                    <p className="infoProfile">Name: <span className="info">{user.name ? user.name : 'None'}</span></p>
                                    <p className="infoProfile">Userame: <span className="info">{user.username}</span></p>
                                    <p className="infoProfile">Account ID: <span className="info">{user.id}</span></p>
                                </>
                            )}
                            <button className="logout" onClick={handleLogout}>Logout</button>
                        </div>
                        <button 
                        onClick={closeModal}
                        style={{
                            position: 'fixed', 
                            top: '10px', 
                            right: '10px',
                            background: '#0d253f',
                            color: 'white',
                            border: '1px solid lightsteelblue', 
                            borderRadius: '4px', 
                            width: '3rem', 
                            height: '2rem',
                            cursor: 'pointer',
                        }}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </Modal>
                </div>
            ) : (
                <div>
                    <button onClick={openModal} className="login">Login</button>
                    <Modal 
                            isOpen={modalIsOpen} 
                            onRequestClose={closeModal} 
                            contentLabel="Authentication Modal"
                            style={{
                                overlay: {
                                    zIndex: 9999,
                                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                },
                                content: {
                                    background: '#0d253f',
                                    width: '55%',
                                    height: '65%', 
                                    margin: 'auto', 
                                    padding: '20px', 
                                    border: '1px solid lightsteelblue', 
                                    borderRadius: '4px', 
                                    overflow: 'auto',
                                },
                            }}
                        >
                            <div className="loginRegister">
                                <h2 className="titleLogin">Login</h2>
                                <h3 className="validated">{token ? 'You can enter your TMDB username and password now!' : <button className="validate" onClick={handleLoginSubmit}>Please, validate the token first</button>}</h3>
                                    
                                    <form className="loginForm">
                                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                        <input className="submit" type="submit" value="Connect" onClick={handleValidationSubmit} />
                                    </form>

                            </div>
                        <button 
                        onClick={closeModal}
                        style={{
                            position: 'fixed', 
                            top: '10px', 
                            right: '10px',
                            background: '#0d253f',
                            color: 'white',
                            border: '1px solid lightsteelblue', 
                            borderRadius: '4px', 
                            width: '3rem', 
                            height: '2rem',
                            cursor: 'pointer',
                        }}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </Modal>
                </div>
            )}
        </div>
    );
}

Login.propTypes = {
    displayName: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    setIsLoggedIn: PropTypes.func,
    user: PropTypes.object,
    setUser: PropTypes.func,
  };
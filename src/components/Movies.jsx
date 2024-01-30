import { useState, useEffect } from 'react';
import { Request, RequestToday, UpcomingFetch, PopularFetch, NowPlayingFetch } from '../utilities/request';
import { convertDateFormat } from '../utilities/ConvertDates';
import Modal from 'react-modal';
import Cards from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root')

export function ThisWeek() {
    const [movies, setMovies] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const result = await Request();
            setMovies(result);
        };

        fetchMovies();
    }, []);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };

    return (
        <div className="trending">
            <div className="trendList">
                {movies.map(movie => (
                    <div className="movieItem" key={movie.id}>
                        <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} onClick={() => openModal(movie)} />
                        <div className="infoIndMovie">
                            <h3 className="titleMovie">{movie.title}</h3>
                            <p className="normalText">{movie.vote_average} | ({convertDateFormat(movie.release_date)})</p>
                        </div>
                    </div>
                ))}
            </div>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                shouldCloseOnOverlayClick={true}
                contentLabel="Similar Movies"
                style={{
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        background: '#0d253f',
                        inset:'5px',
                        width: '85%',
                        height: '80%', 
                        margin: 'auto', 
                        padding: '20px', 
                        border: '1px solid lightsteelblue', 
                        borderRadius: '4px', 
                        overflow: 'auto', 
                    },
                }}
            >
                {selectedMovie && (
                    <div>
                        <Cards movieId={selectedMovie.id} />
                        <button style={{
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
                        }} onClick={closeModal}>
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export function Today() {
    const [movies, setMovies] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {
        const fetchMovies = async () => {
            const result = await RequestToday();
            setMovies(result);
        };

        fetchMovies();
    }, []);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };

    return (
        <div className="trending">
            <div className="trendList">
                {movies.map(movie => (
                    <div className="movieItem" key={movie.id}>
                        <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} onClick={() => openModal(movie)} />
                        <div className="infoIndMovie">
                            <h3 className="titleMovie">{movie.title}</h3>
                            <p className="normalText">{movie.vote_average} | ({convertDateFormat(movie.release_date)})</p>
                        </div>
                    </div>
                ))}
            </div>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                shouldCloseOnOverlayClick={true}
                contentLabel="Similar Movies"
                style={{
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        background: '#0d253f',
                        inset:'5px',
                        width: '85%',
                        height: '80%', 
                        margin: 'auto', 
                        padding: '20px', 
                        border: '1px solid lightsteelblue', 
                        borderRadius: '4px', 
                        overflow: 'auto', 
                    },
                }}
            >
                {selectedMovie && (
                    <div>
                        <Cards movieId={selectedMovie.id} />
                        <button style={{
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
                        }} onClick={closeModal}>
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export function Upcoming() {
    const [movies, setMovies] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchUpcoming = async() => {
            const result = await UpcomingFetch();
            setMovies(result)
        }
        fetchUpcoming();
    }, []);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };

    return (
        <div className="trending">
            <div className="trendList">
                {movies.map(movie => (
                    <div className="movieItem" key={movie.id}>
                        <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} onClick={() => openModal(movie)} />
                        <div className="infoIndMovie">
                            <h3 className="titleMovie">{movie.title}</h3>
                            <p className="normalText">{movie.vote_average} | ({convertDateFormat(movie.release_date)})</p>
                        </div>
                    </div>
                ))}
            </div>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                shouldCloseOnOverlayClick={true}
                contentLabel="Similar Movies"
                style={{
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        background: '#0d253f',
                        inset:'5px',
                        width: '85%',
                        height: '80%', 
                        margin: 'auto', 
                        padding: '20px', 
                        border: '1px solid lightsteelblue', 
                        borderRadius: '4px', 
                        overflow: 'auto', 
                    },
                }}
            >
                {selectedMovie && (
                    <div>
                        <Cards movieId={selectedMovie.id} />
                        <button style={{
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
                        }} onClick={closeModal}>
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export function Popular() {
    const [movies, setMovies] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const fetchPopular = async() => {
            const result = await PopularFetch();
            setMovies(result)
        }
        fetchPopular();
    }, []);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };

    return (
        <div className="trending">
            <div className="trendList">
                {movies.map(movie => (
                    <div className="movieItem" key={movie.id}>
                        <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} onClick={() => openModal(movie)}/>
                        <div className="infoIndMovie">
                            <h3 className="titleMovie">{movie.title}</h3>
                            <p className="normalText">{movie.vote_average} | ({convertDateFormat(movie.release_date)})</p>
                        </div>
                    </div>
                ))}
            </div>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                shouldCloseOnOverlayClick={true}
                contentLabel="Similar Movies"
                style={{
                    overlay: {
                        zIndex: 9999,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        background: '#0d253f',
                        width: '85%',
                        inset:'5px',
                        height: '80%', 
                        margin: 'auto', 
                        padding: '20px', 
                        border: '1px solid lightsteelblue', 
                        borderRadius: '4px', 
                        overflow: 'auto', 
                    },
                }}
            >
                {selectedMovie && (
                    <div>
                        <Cards movieId={selectedMovie.id} />
                        <button style={{
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
                        }} onClick={closeModal}>
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export function NowPlaying() {
    const [movie, setMovie] = useState(null); // initialize movie with null
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchNowPlaying = async() => {
            const result = await NowPlayingFetch();
            const randomIndex = Math.floor(Math.random() * result.length);
            setMovie(result[randomIndex]);
        }
        fetchNowPlaying();
    }, []);

    const handleClick= () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="SecondBanner"> 
            {movie && (
                <>
                    <div className="bannerLink" onClick={handleClick}>
                        <figure className="imgContainer">
                            <img className="bannerImg" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}/>
                        </figure>
                        <div className="bannerInfo">
                            <h1 className="bannerTitle">{movie.title}</h1>
                            <p className="infos"><span className="color">{movie.vote_average}</span> - {convertDateFormat(movie.release_date)}</p>
                            <p className="overviewBanner">{movie.overview}</p>
                        </div>
                    </div>
                    <Modal
                        isOpen={modalIsOpen} 
                        onRequestClose={closeModal} 
                        shouldCloseOnOverlayClick={true}
                        contentLabel="Second Banner"
                        style={{
                            overlay: {
                                zIndex: 9999,
                                backgroundColor: 'rgba(0, 0, 0, 0.75)', 
                            },
                            content: {
                                background: '#0d253f',
                                inset:'5px',
                                width: '85%',
                                height: '80%', 
                                margin: 'auto', 
                                padding: '20px', 
                                border: '1px solid lightsteelblue', 
                                borderRadius: '4px', 
                                overflow: 'auto',
                            },
                        }}
                    >
                        <Cards movieId={movie.id} />
                        <button style={{
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
                        }} onClick={closeModal}>
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </Modal>
                </>
            )}
        </div>
    );
}
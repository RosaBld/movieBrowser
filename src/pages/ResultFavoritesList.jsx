import { useState, useEffect } from 'react';
import { convertDateFormat } from '../utilities/ConvertDates';
import Modal from 'react-modal';
import Cards from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ListFavorite } from '../utilities/request';
import PropTypes from 'prop-types';

export function ResultFavoriteMovies({ isLoggedIn }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movie, setMovie] = useState([]);

    useEffect (() => {
        const fetchMovies = async () => {
            if (isLoggedIn) {
                const result = await ListFavorite();
                setMovie(result);
            } else {
                setMovie([]);
            }
        };

        fetchMovies();
    }, [isLoggedIn]);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };

    return (
        <div className="results">
            <h2 className="">My Favorites Movies:</h2>
            {isLoggedIn ? ( 
                <div className="resultsList">
                    {movie.map(movie => (
                        <div className="movieItem" key={movie.id}>
                            <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} onClick={() => openModal(movie)} />
                            <div className="infoIndMovie">
                                <h3 className="titleMovie">{movie.title}</h3>
                                <p className="normalText">{movie.vote_average} | ({convertDateFormat(movie.release_date)})</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2>You need to be connected to see your favorites movies list!</h2>
            )}
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
                        <button className="close" onClick={closeModal}>
                            <FontAwesomeIcon icon={faX} className="faClose" />
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    )
}

ResultFavoriteMovies.propTypes = {
    isLoggedIn: PropTypes.bool,
};
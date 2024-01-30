import { useState, useEffect } from 'react';
import Cards from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faX } from '@fortawesome/free-solid-svg-icons';
import { convertDateFormat } from '../utilities/ConvertDates';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const API_KEY= import.meta.env.VITE_APP_API_KEY;
const BEARER=import.meta.env.BEARER_TOKEN

export function SimilarMovies({ movieId }) {
    const [simMovies, setSimMovies] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    SimilarMovies.propTypes = {
        movieId: PropTypes.number.isRequired,
    };

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`,
                {
                    headers: {
                        'Authorization': `Bearer ${BEARER}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
            const data= await response.json();
            if (data.results) {
                setSimMovies(data.results.slice(0,5));
            } else {
                console.log('data.results is undefined', data);
            }
        };

        fetchMovies();
    }, [movieId]);

    if (!simMovies) {
        return <div>Loading...</div>;
    }

    const openModal = (movie) => {
        closeModal();
        setSelectedMovie(movie);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };

    return (
        <div className="simMovies">
            <div className="whatToWatch">
                {Array.isArray(simMovies) && simMovies.map(movie => (
                    <div className="movieItem" key={movie.id}>
                        <div onClick={() => openModal(movie)}>
                            {movie.backdrop_path ?
                                <img className="movie" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}/> :
                                <FontAwesomeIcon className="movie" icon={faImage} />
                            }
                            <div className="infoIndMovie">
                                <h3 className="titleMovie">{movie.title}</h3>
                                <p className="normalText">{movie.vote_average} | ({convertDateFormat(movie.release_date)})</p>
                            </div>
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
                                        <FontAwesomeIcon icon={faX} className="faClose" />
                                    </button>
                                </div>
                            )}
                        </Modal>
                    </div>
                ))}
            </div>
        </div>
    );
}
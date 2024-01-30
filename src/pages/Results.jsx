import { useState } from 'react';
import { convertDateFormat } from '../utilities/ConvertDates';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import Cards from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root')

export function ResultsPage() {
    const location = useLocation();
    const { state } = location;
    const { results } = state || { results: [] };
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
            <h2>Results:</h2>
            <div className="resultsList">
                {results.map(movie => (
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
                            <FontAwesomeIcon icon={faX} className="faClose" />
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
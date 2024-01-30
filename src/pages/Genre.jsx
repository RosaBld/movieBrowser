import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Request, RequestToday, TopRated, Genre, UpcomingFetch, PopularFetch, NowPlayingFetch } from '../utilities/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faX } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import Cards from '../components/Card';

Modal.setAppElement('#root')

function GenreList() {
    const [movies, setMovies] = useState();
    const [genre, setGenre] = useState()
    const { id } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
    const fetchGenre = async () => {
        const result = await Genre(id);
        setGenre(result);
    }

    fetchGenre();
}, [id]);

useEffect(() => {
    const fetchMovies = async () => {
        if (genre) {
            const fetchRequests = [Request(), RequestToday(), TopRated(), UpcomingFetch(), PopularFetch(), NowPlayingFetch()]
            const results = await Promise.all(fetchRequests);
            const allMovies=results.flat();

            const uniqueMovies = allMovies.reduce((unique, movie) => {
                return unique.some(m => m.id === movie.id) ? unique : [...unique, movie];
            }, []);
            
            const moviesOfGenre = uniqueMovies.filter(movie => movie.genre_ids.includes(Number(id)));
            setMovies(moviesOfGenre);
        }
    };

    fetchMovies();
}, [genre, id]);

    const genreName = genre && genre.genres.find(g => g.id === Number(id))?.name;

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setModalIsOpen(false);
    };
    
    return (
        <div className="sameGenre">
            <h3 className="titleGenre">{genreName} Movies</h3>
            <div className="ListGenre">
            {movies && movies.map(movie => (
                <div key={movie.id}>
                    <div className="movieItem">
                        {movie.poster_path ?
                            <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} onClick={() => openModal(movie)}/>
                            :
                            <FontAwesomeIcon className="movie" icon={faImage} onClick={() => openModal(movie)} />
                        }
                        <div className="infoIndMovie">
                            <h3 className="titleMovie">{movie.title}</h3>
                            <p className="normalText">{movie.vote_average} | ({movie.release_date})</p>
                        </div>
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
                            width: '5%', 
                            height: '6%',
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

export default GenreList;
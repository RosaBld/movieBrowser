import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { RequestBanner } from '../utilities/request';
import { convertDateFormat } from '../utilities/ConvertDates';
import Cards from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Banner() {
    const [movie, setMovie] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            const movies = await RequestBanner();
            const randomIndex = Math.floor(Math.random() * movies.length);
            setMovie(movies[randomIndex]);
        };

        fetchMovie();
    }, []);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const handleClick= () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="banner"> 
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
                contentLabel="Banner"
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
                <button className="close" onClick={closeModal}>
                    <FontAwesomeIcon icon={faX} className="faClose" />
                </button>
            </Modal>
        </div>
    );
}

export default Banner;
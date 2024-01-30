import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RequestSpecific, Genre } from '../utilities/request';
import { SimilarMovies } from './SimilarMovies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { WatchLists } from './Lists';

function Cards({ movieId }) {
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState();
    const [sessionId, setSessionId] = useState(null);
    const [accountId, setAccountId] = useState(null)

    useEffect(() => {
        const fetchMovie = async () => {
            const result = await RequestSpecific(movieId);
            setMovie(result);
        };

        fetchMovie();
        
        const fetchGenre=async () => {
            const result=await Genre();
            setGenres(result);
        }
        
        fetchGenre();

    }, [movieId, setGenres]);

    console.log(movieId);

    useEffect(() => {
        const storedSessionId = sessionStorage.getItem('sessionId');
        const storedAccountId = sessionStorage.getItem('accountId');
    
        if (storedSessionId !== sessionId) {
            setSessionId(storedSessionId);
        }
    
        if (storedAccountId !== accountId) {
            setAccountId(storedAccountId);
        }
    }, [sessionId, accountId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return ( 
        <div className="individualCards">
            <div className="imageAndButtons">
                {movie.backdrop_path ?
                <div className="image-container">
                    <img className="indCard" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}/>
                    <div className="watchlist-overlay">
                        <WatchLists sessionId={sessionId} movieId={movieId} />
                    </div>
                </div>    
                    :
                    <div className="image-container">
                        <FontAwesomeIcon className="indCard" icon={faImage} />
                        <div className="watchlist-overlay">
                            <WatchLists sessionId={sessionId} movieId={movieId} />
                        </div>
                    </div>
                } 
            </div>
            <div className='info'>
                <h3 className='titleMovie'>{movie.title}</h3>
                
                <div className="specificInfos">
                    <p className="time">
                        <img className="timer" src="/timer.png" alt="timer-logo"></img>
                        {movie.runtime} minutes
                    </p>
                    <p className="infoMovie">
                        <img className="rating" src="/rating.png" alt="rating-logo"></img>
                        {movie.vote_average}
                    </p>
                </div>
            </div>

            <div className='release'>
                <div className="releaseDate">
                    <h4>Release date</h4>
                    <p>{movie.release_date}</p>
                </div>
                <div className="genre">
                    <h4>Genre</h4>
                        {genres && movie.genres && movie.genres.map((genre) => (
                            <Link key={genre.id} to = {`/Genre/${genre.id}`}>
                                <button className="btnGenre" key={genre.id}>{genre.name}</button>
                            </Link>
                        ))}
                </div>
            </div>

            <div className="synopsis">
                <h4>Synopsis</h4>
                <p>{movie.overview}</p>
            </div>

            <div className="Similars">
            <h2>Similar to {movie.title}</h2>
                <SimilarMovies movieId={movieId} />
            </div>

        </div>
    )
}

export default Cards;

Cards.propTypes = {
    movieId: PropTypes.number.isRequired,
};
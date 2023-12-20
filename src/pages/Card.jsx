import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RequestSpecific, Genre } from '../utilities/request';
import { SimilarMovies } from '../components/SimilarMovies'
// import { Provider } from './Provider';

function Cards() {
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState();
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const fetchMovie = async () => {
            const result = await RequestSpecific(id);
            setMovie(result);
        };

        fetchMovie();
        
        const fetchGenre=async () => {
            const result=await Genre();
            setGenres(result);
        }
        
        fetchGenre();

    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return ( 
        <div className="individualCards">
            <img className="indCard" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}/>
            {/* <Provider /> */}
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
                        {movie.genres && movie.genres.map((genre) => (
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

            <SimilarMovies />

        </div>
    )
}

export default Cards;
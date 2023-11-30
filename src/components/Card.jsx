import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RequestSpecific, Genre } from '../utilities/request';
import { SimilarMovies } from './SimilarMovies'

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
        <div className="individualsCards">
            <div className='info'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title}/>
                <h3>{movie.original_title}</h3>
                <p className="time">{movie.runtime} minutes</p>
                <p className="infoMovie">{movie.vote_average}</p>
            </div>

            <div className='release'>
                <h4>Release date</h4>
                <p>{movie.release_date}</p>
                <h4>Genre</h4>
                {movie.genres && movie.genres.map((genre) => (
                    <p key={genre.id}>{genre.name}</p>
                ))}
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
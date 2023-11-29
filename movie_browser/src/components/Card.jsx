import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RequestSpecific from '../utilities/RequestSpecific';

function Cards() {
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const fetchMovie = async () => {
            const result = await RequestSpecific(id);
            setMovie(result);
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return ( 
        <div className="individualsCards">
            <div className='info'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <h3>{movie.original_title}</h3>
                <p className="infoMovie">{movie.vote_average}</p>
            </div>
            <div className='release'>
                <h4>Release date</h4>
                <p>{movie.release_date}</p>
                <h4>Genre</h4>
                <p>{movie.genre_ids}</p>
            </div>
            <div className="synopsis">
                <h4>Synopsis</h4>
                <p>{movie.overview}</p>
            </div>
        </div>
    )
}

export default Cards;
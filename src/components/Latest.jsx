import React, { useState, useEffect } from 'react';
import { RequestLatest } from '../utilities/request';


function TopRandom() {
    const [movies, setMovies] = useState();

    useEffect(() => {
        const fetchMovie = async () => {
            do {
                const id = Math.floor(Math.random() * 1000000);
                result = await RequestLatest(id);
            } while (!result || result.media_type !== 'movie');
            
            setMovies(result);
        };

        fetchMovie();
    }, []);

    if (!movies) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title}/>
        </div>
    );
}

export default TopRandom;
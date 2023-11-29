import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Request from '../utilities/request';


function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const result = await Request();
            setMovies(result);
        };

        fetchMovies();
    }, []);

    console.log(movies);

    return (
        <div>
            {movies.map(movie => (
                <div key={movie.id}>
                    <Link to = {`/Card/${movie.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                    </Link>
                    <h3>{movie.title}<span className="normalText"> ({movie.release_date})</span></h3>
                </div>
            ))}
        </div>
    );
}

export default MovieList;
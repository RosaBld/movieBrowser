import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Request, RequestToday } from '../utilities/request';


export function ThisWeek() {
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
            <h3>Trending this week:</h3>
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

export function Today() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const result = await RequestToday();
            setMovies(result);
        };

        fetchMovies();
    }, []);

    console.log(movies);

    return (
        <div>
            <h3>Trending Today:</h3>
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
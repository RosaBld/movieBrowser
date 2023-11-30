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
        <div className="trending">
            <div className="trendList">
                {movies.map(movie => (
                    <div className="movieItem" key={movie.id}>
                        <Link to={`/Card/${movie.id}`}>
                            <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                        </Link>
                        <h3 className="titleMovie">{movie.title}<span className="normalText"> ({movie.release_date})</span></h3>
                    </div>
                ))}
            </div>
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
        <div className="trending">
            <div className="trendList">
                {movies.map(movie => (
                    <div className="movieItem" key={movie.id}>
                        <Link to={`/Card/${movie.id}`}>
                            <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                        </Link>
                        <h3 className="titleMovie">{movie.title}<span className="normalText"> ({movie.release_date})</span></h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Request, RequestToday, TopRated, Genre } from '../utilities/request';

function GenreList() {
    const [movies, setMovies] = useState();
    const [genre, setGenre] = useState()
    const { id } = useParams();

 useEffect(() => {
    const fetchGenre = async () => {
        const result = await Genre(id);
        console.log(result);
        setGenre(result);
    }

    fetchGenre();
}, [id]);

useEffect(() => {
    const fetchMovies = async () => {
        if (genre) {
            const fetchRequests = [Request(), RequestToday(), TopRated()]
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
}, [genre]);

    const genreName = genre && genre.genres.find(g => g.id === Number(id))?.name;

    return (
        <div className="sameGenre">
            <h2>{genreName} Movies</h2>
            <div className="ListGenre">
            {movies && movies.map(movie => (
                <div key={movie.id}>
                    <div className="movieItem" key={movie.id}>
                        <Link to={`/Card/${movie.id}`}>
                            <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                            <div className="infoIndMovie">
                                <h3 className="titleMovie">{movie.title}</h3>
                                <p className="normalText">{movie.vote_average} | ({movie.release_date})</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default GenreList;
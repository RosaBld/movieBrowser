import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Genre, Request, RequestToday, TopRated } from '../utilities/request';

// export function ListGenres() {
//     const [genres, setGenre] = useState([]);
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         const fetchGenre = async () => {
//             const result = await Genre();
//             console.log(result);
//             if (Array.isArray(result.genres)) {
//                 setGenre(result.genres);
//             } else {
//                 console.error('Genre() did not return an array');
//             }
//         }
//         fetchGenre();
//     }, []);

//     useEffect(() => {
//         const fetchMovies = async () => {
//             const fetchRequests = [Request(), RequestToday(), TopRated()]
//             const results = await Promise.all(fetchRequests);
//             const allMovies=results.flat();

//             // const uniqueMovies = allMovies.reduce((unique, movie) => {
//             //     return unique.some(m => m.id === movie.id) ? unique : [...unique, movie];
//             // }, []);
            
//             // const moviesOfGenre = uniqueMovies.filter(movie => movie.genre_ids.includes(Number(selectedGenre.id)));
//             setMovies(allMovies);
//             console.log(allMovies);
            
//         };
    
//         fetchMovies();
//     }, []);


export function ListGenres () {
    const [genres, setGenres] = useState([]);
    

    useEffect(() => {
        const getMoviesByGenre= async (genreId) => {
            const [movies1, movies2, movies3] = await Promise.all([
                Request(genreId),
                RequestToday(genreId),
                TopRated(genreId)
            ]);
            const allMovies = [...movies1, ...movies2, ...movies3];
        
            const uniqueMovieIds = new Set(allMovies.map(movie => movie.id));
            const uniqueMovies = allMovies.filter(movie => uniqueMovieIds.has(movie.id));

            return uniqueMovies;
        }

        const fetchGenresAndMovies = async () => {
            const genreResult = await Genre();
            const genresWithMovies = await Promise.all(genreResult.genres.map(async genre => {
                const movies = await getMoviesByGenre(genre.id);
                return { ...genre, movies };
            }));
            setGenres(genresWithMovies);
        };
        fetchGenresAndMovies();
    }, []);

    return (
        <div className="listOfGenre">
            <nav>
            {genres.map(genre => (
                <div className="genresListing" key={genre.id}>
                    <button className="GenreName" onClick= {() => setSelectedGenre(genre)}>
                        {genre.name}
                    </button>
                </div>
            ))}
            </nav>
                {genres.movies.map(movie => (
                    <div className="movieItem" key={movie.id}>
                        <Link to={`/Card/${movie.id}`}>
                            <img className="movie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                            <div className="infoIndMovie">
                                <h3 className="titleMovie">{movie.title}</h3>
                                <p className="normalText">{movie.vote_average} | ({movie.release_date})</p>
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RequestBanner } from '../utilities/request';

function Banner() {
    const [movie, setMovie] = useState();

    useEffect(() => {
        const fetchMovie = async () => {
            const movies = await RequestBanner();
            const randomIndex = Math.floor(Math.random() * movies.length);
            setMovie(movies[randomIndex]);
        };

        fetchMovie();
    }, []);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="banner"> 
            <Link to = {`/Card/${movie.id}`}>
                <img className="bannerImg" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title}/>
                <div className="bannerInfo">
                    <h1 className="bannerTitle">{movie.title}</h1>
                    <p className="infos"><span className="color">{movie.vote_average}</span> - {movie.release_date}</p>
                    <p className="overviewBanner">{movie.overview}</p>
                </div>


            </Link>
        </div>
    );
}

export default Banner;
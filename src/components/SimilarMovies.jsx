import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const API_KEY= import.meta.env.VITE_APP_API_KEY;
const BEARER=import.meta.env.BEARER_TOKEN

export function SimilarMovies() {
    const [simMovies, setSimMovies] = useState([]);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`,
                {
                    headers: {
                        'Authorization': `Bearer ${BEARER}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
            const data= await response.json();
            setSimMovies(data.results.slice(0,5));
        };

        fetchMovies();
    }, [id]);

    if (!simMovies) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Movies you might want to watch</h2>
            {Array.isArray(simMovies) && simMovies.map(movie => (
                <div key={movie.id}>
                    <Link to={`/Card/${movie.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                    </Link>
                    <h3>{movie.title}<span className="normalText"> ({movie.release_date})</span></h3>
                </div>
            ))}
        </div>
    );
}
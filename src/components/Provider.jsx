// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { ProviderRequest, RequestSpecific, } from '../utilities/request';

// const API_KEY= import.meta.env.VITE_APP_API_KEY;
// const BEARER=import.meta.env.BEARER_TOKEN

// export function Provider() {
//     const [movie, setMovies] = useState([]);
//     const [providers, setProviders] = useState([]);
//     const { id } = useParams();
//     console.log(id);

//     useEffect(() => {
//         const fetchProviders = async () => {
//             const response = await fetch(
//                 `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${BEARER}`,
//                         'Content-Type': 'application/json;charset=utf-8'
//                     }
//                 });
//             const data= await response.json();
//             setMovies(data.results);
//         };
//         fetchProviders()
//     }, [id]);


//     if (!movie) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="Providers">
//             {providers.map(provider => (
//                 <img className="logoProvider" src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt="logoProvider">
//                 </img>
//             ))}
//         </div>
//     )
// }
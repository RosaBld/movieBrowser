import { useState } from 'react';
const API_KEY= import.meta.env.VITE_APP_API_KEY;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                navigate('/results', { state: { results: data.results } });
            })
            .catch(error => {
                console.error('Error:', error);
            });
            window.scroll(0, 0);
    };

    return (
        <div className="Search">
            <form onSubmit={handleSearchSubmit} className="form">
                <input className="research" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
                <button className="btnResearch" type="submit">
                    <FontAwesomeIcon icon={faSearch} className="faSearch" />
                </button>
            </form>
        </div>
    );
}
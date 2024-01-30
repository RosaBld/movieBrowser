import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faThumbsUp, faX } from '@fortawesome/free-solid-svg-icons';
import { WatchList, ListWatch,RemoveWatchList, Favorite, DeleteFavorite, ListFavorite } from '../utilities/request';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export function WatchLists({ movieId }) {
    const [watchlist, setWatchlist] = useState([]);
    const [accountId, setAccountId] = useState(null);
    const [favorite, setFavoriteList] = useState([]);

    useEffect(() => {

        const storedAccountId = sessionStorage.getItem('accountId');
        
        setAccountId(storedAccountId);
    }, []);

    const addToWatchList = async () => {
        if (accountId) {
            try {
                const addWatch = await WatchList(accountId, movieId);
                setWatchlist([...watchlist, addWatch]);
            } catch (error) {
                console.error('Failed to add item to watchlist:', error);
            }
        }
    }

    const RemoveFromWatchList = async () => {
        if (accountId) {
            try {
                const addWatch = await RemoveWatchList(accountId, movieId);
                setWatchlist([...watchlist, addWatch]);
            } catch (error) {
                console.error('Failed to add item to watchlist:', error);
            }
        }
    }

    useEffect (() => {
        const fetchMovies = async () => {
            const result = await ListWatch();
            setWatchlist(result.results);
        };
    
        fetchMovies();
    }, []);

    const isInWatchlist = (movieId) => {
        return watchlist.some(watchlistMovie => watchlistMovie.id === movieId);
    };

    const addToFavorite = async () => {
        if (accountId) {
            try {
                const addWatch = await Favorite(accountId, movieId);
                setFavoriteList([...favorite, addWatch]);
            } catch (error) {
                console.error('Failed to add item to favoritelist:', error);
            }
        }
    };

    const RemoveFromFavoriteList = async () => {
        if (accountId) {
            try {
                const addWatch = await DeleteFavorite(accountId, movieId);
                setFavoriteList([...favorite, addWatch]);
            } catch (error) {
                console.error('Failed to add item to favoritelist:', error);
            }
        }
    };

    useEffect (() => {
        const fetchMovies = async () => {
            const result = await ListFavorite();
            setFavoriteList(result.results);
        };
    
        fetchMovies();
    }, []);

    const isInFavorite = (movieId) => {
        return favorite.some(setFavoriteList => setFavoriteList.id === movieId);
    };

    return (
        <div className="lists">
            <button className="addLists" onClick={isInWatchlist(movieId) ? RemoveFromWatchList : addToWatchList } >
                <FontAwesomeIcon className="faLists" icon={isInWatchlist(movieId) ? faX : faPlus} style={{color: "#ffffff"}} />
            </button>
            <button className="addLists" onClick={isInFavorite(movieId) ? RemoveFromFavoriteList : addToFavorite }>
                <FontAwesomeIcon className="faLists" icon={isInFavorite(movieId) ? faX : faThumbsUp} style={{color: "#ffffff"}} />
            </button>
        </div>
    )
}

WatchLists.propTypes = {
    movieId: PropTypes.number,
};
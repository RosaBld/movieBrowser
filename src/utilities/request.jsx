const API_KEY= import.meta.env.VITE_APP_API_KEY;
const BEARER=import.meta.env.VITE_BEARER_TOKEN

export const RequestBanner = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
            {
                headers: {
                    'Authorization': `Bearer ${BEARER}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data.results.slice(0, 10);
    } catch (error) {
        console.error(error);
        throw new Error("Can't fetch the datas");
    }   
};

export const TopRated = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
            {
                headers: {
                    'Authorization': `Bearer ${BEARER}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw new Error("Can't fetch the datas");
    }   
};

export const Request = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
            {
                headers: {
                    'Authorization': `Bearer ${BEARER}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data=await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw new Error("Can't fetch the datas");
    }  
};

export const RequestToday = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
            {
                headers: {
                    'Authorization': `Bearer ${BEARER}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data=await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw new Error("Can't fetch the datas");
    }  
};

export const RequestSpecific = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
            {
                headers: {
                    'Authorization': `Bearer ${BEARER}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data=await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Can't fetch the datas");
    }  
};

export const UpcomingFetch = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
            { 
                headers : {
                    'Authorization' : `Bearer ${BEARER}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data=await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
        throw new Error("Can't fetch the datas");
    }
}

export const NowPlayingFetch = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`,
            {
                headers : {
                    'Authorization' : `Bearer ${BEARER}`,
                    'Content-Type': `application/JSON:charse=utf-8`
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data=await response.json();
        return data.results.slice(0, 20);
    } catch (error) {
        console.log(error);
        throw new Error("Can't fetch the datas");
    }
}


export const PopularFetch = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
            {
                headers : {
                    'Authorization' : `Bearer ${BEARER}`,
                    'Content-Type': `application/JSON:charse=utf-8`
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data=await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
        throw new Error("Can't fetch the datas");
    }
}

export const Genre = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
            {
                headers: {
                    'Authorization': `Bearer ${BEARER}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }
        );
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data=await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Can't fetch the datas");
    }   
}

export const RequestToken = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${BEARER}`
        }
      };

    const response = await fetch(`https://api.themoviedb.org/3/authentication/token/new`, options);
    const data = await response.json();

    if (data.success) {
        return data.request_token;
    } else {
        throw new Error(data.status_message);
    }
}

export const ValidateToken = async (token, username, password) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${BEARER}`
        },
        body: JSON.stringify({
            username: username,
            password: password,
            request_token: token
        })
    }
    const response = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login`, options);

    const data = await response.json();

    if (data.success) {
        return data.request_token;
    } else {
        throw new Error(data.status_message);
    }
};

export const CreateSession = async (token) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${BEARER}`
        },
        body: JSON.stringify({
            request_token: token
        })
      };
    
    const response = await fetch(`https://api.themoviedb.org/3/authentication/session/new`, options)

    const data = await response.json();

    if (data.success) {
        return data.session_id;
    } else {
        throw new Error(data.status_message);
    }
};


export const GetAccountDetails = async (sessionId, account_id) => {
    const response = await fetch(`https://api.themoviedb.org/3/account/${account_id}?session_id=${sessionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${BEARER}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        throw new Error(data.status_message);
    }
};

export const WatchList = async (accountId, movieId) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${BEARER}`
        },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": movieId,
            "watchlist": true
        })
      };
    const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist`, options)
    
    const data = await response.json();
    
    if (data.success) {
        return data;
    } else {
        throw new Error(data.status_message);
    }
};

export const RemoveWatchList = async (accountId, movieId) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${BEARER}`
        },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": movieId,
            "watchlist": false
        })
      };
    const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist`, options)
    
    const data = await response.json();
    
    if (data.success) {
        return true;
    } else {
        throw new Error(data.status_message);
    }
};

export const ListWatch = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mzg1YzAwMmU2YjU3OGYxYzM4YTRkZjNiOWUzYTFjMyIsInN1YiI6IjY1NjQ4YzdmNzA2ZTU2MDBjNGJjMjZhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I45NkJVPPo5AZRE2g9VJWINukRlkhaC_NaW34-eV404'
        }
    };

    const response = await fetch (`https://api.themoviedb.org/3/account/20757831/watchlist/movies`, options)
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const Favorite = async (accountId, movieId) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${BEARER}`
        },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": movieId,
            "favorite": true
        })
      };
    const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite`, options)
    
    const data = await response.json();
    
    if (data.success) {
        return data;
    } else {
        throw new Error(data.status_message);
    }
};

export const DeleteFavorite = async (accountId, movieId) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${BEARER}`
        },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": movieId,
            "favorite": false
        })
      };
    const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite`, options)
    
    const data = await response.json();
    
    if (data.success) {
        return true;
    } else {
        throw new Error(data.status_message);
    }
};

export const ListFavorite = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${BEARER}`
        }
    };

    const response = await fetch (`https://api.themoviedb.org/3/account/20757831/favorite/movies`, options)
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
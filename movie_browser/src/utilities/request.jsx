const API_KEY= import.meta.env.VITE_APP_API_KEY;
const BEARER=import.meta.env.BEARER_TOKEN

const Request = async () => {
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

export default Request;
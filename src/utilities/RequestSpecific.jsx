const API_KEY= import.meta.env.VITE_APP_API_KEY;
const BEARER=import.meta.env.BEARER_TOKEN

const RequestSpecific = async (id) => {
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
            throw new Error('Something went wrong');
        }
        const data=await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Can't fetch the datas");
    }  
};

export default RequestSpecific;
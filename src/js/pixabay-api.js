const API_KEY = '46125856-848a47cf49f0e2da350750fba'; // API-ключ
const BASE_URL = 'https://pixabay.com/api/';


export const fetchImages = async (query, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 15,
                page: page,
            },
        });

        if (response.status !== 200) {
            throw new Error('Error fetching images');
        }

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const API_KEY = '46125856-848a47cf49f0e2da350750fba'; // API-ключ
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = query => {
    return fetch(
        `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    )
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching images');
            }
            return response.json();
        })
        .then(data => data.hits);
};
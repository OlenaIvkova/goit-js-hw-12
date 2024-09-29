import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showLoader, hideLoader } from './js/render-functions.js';

const searchForm = document.querySelector('.search-form');
// const lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const query = document.querySelector('input[name="query"]').value.trim();
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Search query cannot be empty.',
        });
        return;
    }

    showLoader();
    fetchImages(query)
        .then(images => {
            renderImages(images);
        })
        .catch(error => {
            console.error(error);
            iziToast.error({
                title: 'Error',
                message:
                    'An error occurred while fetching images. Please try again later.',
            });
        })
        .finally(() => {
            hideLoader();
        });
});
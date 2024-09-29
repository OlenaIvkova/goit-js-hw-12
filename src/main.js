import { fetchImages } from './js/pixabay-api.js';
import {
    renderImages,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    showEndOfResultsMessage,
} from './js/render-functions.js';

const searchForm = document.querySelector('.search-form');
// const lightbox = new SimpleLightbox('.gallery a');


const loadMoreBtn = document.createElement('button');
loadMoreBtn.classList.add('load-more');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.style.display = 'none';
document.body.appendChild(loadMoreBtn);

let query = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // const query = document.querySelector('input[name="query"]').value.trim();
    query = document.querySelector('input[name="query"]').value.trim();
    page = 1;
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Search query cannot be empty.',
        });
        return;
    }

    clearGallery();
    hideLoadMoreButton();

    try {
        showLoader();
        const data = await fetchImages(query, page);
        totalHits = data.totalHits;

        if (data.hits.length > 0) {
            renderImages(data.hits);
            showLoadMoreButton();
        }

        if (data.hits.length < 15 || page * 15 >= totalHits) {
            hideLoadMoreButton();
            showEndOfResultsMessage();
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again later.',
        });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;

    try {
        showLoader();
        const data = await fetchImages(query, page);
        renderImages(data.hits);

        if (page * 15 >= totalHits) {
            hideLoadMoreButton();
            showEndOfResultsMessage();
        }

        // Smooth scroll
        const gallery = document.querySelector('.gallery');
        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again later.',
        });
    } finally {
        hideLoader();
    }
});

// showLoader();
// fetchImages(query)
//     .then(images => {
//         renderImages(images);
//     })
//     .catch(error => {
//         console.error(error);
//         iziToast.error({
//             title: 'Error',
//             message:
//                 'An error occurred while fetching images. Please try again later.',
//         });
//     })
//     .finally(() => {
//         hideLoader();
//     });
// });
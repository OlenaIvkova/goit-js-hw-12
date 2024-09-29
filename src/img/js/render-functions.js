import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');

export const renderImages = images => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    if (images.length === 0) {
        iziToast.error({
            title: 'Error',
            message:
                'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
    }

    const markup = images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) => `
            <li class="gallery-item">
                <a href="${largeImageURL}" class="gallery-link">
                    <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
                </a>
                <div class="info">
                    <p class="info-item"><span>Likes:</span> ${likes}</p>
                    <p class="info-item"><span>Views:</span> ${views}</p>
                    <p class="info-item"><span>Comments:</span> ${comments}</p>
                    <p class="info-item"><span>Downloads:</span> ${downloads}</p>
                </div>
            </li>
        `
        )
        .join('');

    gallery.innerHTML = markup;
    lightbox.refresh();
};

export const showLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'block';
    }
};

export const hideLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
};
const BASE_URL = 'https://api.themoviedb.org/3/';
const END_POINT_ALL = 'trending/all/day';
const END_POINT_SEARCH = 'search/movie';
const END_POINT_DETAILS = 'movie/';
const KEY_API = '583e8699bc133adc4a2f7322eb108f1f';

export async function getTrendFilms() {
    return await fetch(`${BASE_URL}${END_POINT_ALL}?api_key=${KEY_API}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
}

export async function getSearchFilms(searchQuery) {
    return await fetch(`${BASE_URL}${END_POINT_SEARCH}?api_key=${KEY_API}&query=${searchQuery}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
}

export async function getFilmDetails(id) {
    return await fetch(`${BASE_URL}${END_POINT_DETAILS}${id}?api_key=${KEY_API}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
}

export async function getFilmCast(id) {
    return await fetch(`${BASE_URL}${END_POINT_DETAILS}${id}/credits?api_key=${KEY_API}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
}

export async function getFilmReviews(id) {
    return await fetch(`${BASE_URL}${END_POINT_DETAILS}${id}/reviews?api_key=${KEY_API}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
}
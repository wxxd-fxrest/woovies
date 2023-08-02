import {REACT_APP_API_KEY, REACT_BASE_URL} from '@env';

export const movieApi = { 
    trending: () => fetch(
      `${REACT_BASE_URL}/trending/movie/week?api_key=${REACT_APP_API_KEY}`
    ).then((res) => res.json()), 

    upcoming: () => fetch(
      `${REACT_BASE_URL}/movie/upcoming?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()), 

    nowPlaying: () => fetch(
        `${REACT_BASE_URL}/movie/now_playing?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()),

    search: ({ queryKey }) => {
        const [_, query] = queryKey;
        return fetch(
          `${REACT_BASE_URL}/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&page=1&query=${query}`
        ).then((res) => res.json());
    },

    detail: ({ queryKey }) => {
        const [_, id] = queryKey;
        return fetch(
          `${REACT_BASE_URL}/movie/${id}?api_key=${REACT_APP_API_KEY}&append_to_response=videos,images`
        ).then((res) => res.json());
    },
};

export const tvApi = {
    trending: () => fetch(
        `${REACT_BASE_URL}/trending/tv/week?api_key=${REACT_APP_API_KEY}`
    ).then((res) => res.json()), 

    airingToday: () => fetch(
        `${REACT_BASE_URL}/tv/airing_today?api_key=${REACT_APP_API_KEY}`
    ).then((res) => res.json()), 

    topRated: () => fetch(
        `${REACT_BASE_URL}/tv/top_rated?api_key=${REACT_APP_API_KEY}`
    ).then((res) => res.json()), 

    search: ({ queryKey }) => {
        const [_, query] = queryKey;
        return fetch(
          `${REACT_BASE_URL}/search/tv?api_key=${REACT_APP_API_KEY}&language=en-US&page=1&query=${query}`
        ).then((res) => res.json());
    },

    detail: ({ queryKey }) => {
        const [_, id] = queryKey;
        return fetch(
          `${REACT_BASE_URL}/tv/${id}?api_key=${REACT_APP_API_KEY}&append_to_response=videos,images`
        ).then((res) => res.json());
    },
};
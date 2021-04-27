import axios from 'axios';

const apiKey = '6be28322108b286b7e45d15ac68bb3b2';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;
const entryUrl = `${url}/search/movie`
let page = 0;
let pageTop = 0;
export const fetchMovies = async () => {
    try {
        const { data } = await axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}

export const fetchGenre = async () => {
    try {
        const { data } = await axios.get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const modifiedData = data['genres'].map((g) => ({
            id: g['id'],
            name: g['name']
        }))
        return modifiedData;
    } catch (error) { }
}

export const fetchMovieByGenre = async (genre_id, inc = 0, fl = true, entry='') => {
    if(entry){
        if (inc % 20 === 0 && fl)
        page++
        if (!fl )
        page = 1;
        console.log(inc)
        try {
            const { data } = await axios.get(entryUrl, {
                params: {
                    api_key: apiKey,
                    language: 'en_US',
                    query: entry,
                    page:page
                }
            });
            console.log(data)
            return data.results.slice(inc, inc + 4);
        } catch (error) {
            
        }
    }
    else {
        if (inc % 20 === 0 && fl)
        page++
    if (!fl)
        page = 1;
    try {
        const { data } = await axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: page,
                with_genres: genre_id
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData.slice(inc, inc + 4);
    } catch (error) { }
    }
}

export const fetchPersons = async (inc) => {
    try {
        const { data } = await axios.get(personUrl, {
            params: {
                api_key: apiKey
            }
        })
        const modifiedData = data['results'].map((p) => ({
            id: p['id'],
            popularity: p['popularity'],
            name: p['name'],
            profileImg: 'https://image.tmdb.org/t/p/w200' + p['profile_path'],
            known: p['known_for_department']
        }))
        return modifiedData.slice(inc, inc + 4);
    } catch (error) { }
}

export const fetchTopratedMovie = async (inc) => {
    if (inc % 20 === 0)
        pageTop++
    try {
        const { data } = await axios.get(topratedUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: pageTop
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        return modifiedData.slice(inc, inc+4);
    } catch (error) {

    }
}

export const fetchMovieDetail = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        return data;
    } catch (error) { }
}

export const fetchMovieVideos = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey,
            }
        });
        return data['results'][0];
    } catch (error) { }
}

export const fetchCasts = async (id, inc) => {

    try {
        const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: apiKey,
            }
        });
        console.log(data)
        const modifiedData = data['cast'].map((c) => ({
            id: c['id'],
            character: c['character'],
            name: c['name'],
            img: 'https://image.tmdb.org/t/p/w200' + c['profile_path'],
        }))
        return modifiedData.slice(inc, inc + 4)

    } catch (error) { }
}

export const fetchSimilarMovie = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}

export const fetchActor = async (id) => {
    try {
        const { data } = await axios.get(`${url}/person/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        return data 
    } catch (error) {
        
    }
}


export const fetchMoviesByActor = async (id) => {
    try {
        const { data } = await axios.get(`${url}/person/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                append_to_response: 'credits'
            }
        });
        console.log(data.credits)
        return data.credits.cast
    } catch (error) {
        
    }
}
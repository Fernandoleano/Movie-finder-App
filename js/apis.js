// The Api key
const apiKey = '49b2c52610a4d4d42b3f125c441af135';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=49b2c52610a4d4d42b3f125c441af135';
const imgUrl = 'https://image.tmdb.org/t/p/w500';

function Url (path) {
    let url = `https://api.themoviedb.org/3${path}?api_key=49b2c52610a4d4d42b3f125c441af135`;
    return url;
}

function requestMovie (url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError)
}

function movieSearchResult (value) {
    let path = '/search/movie';
    let url = Url(path) + '&query=' + value;
    requestMovie(url, searchMovie, error);
}

function upcomingMovies () {
    let path = '/movie/upcoming';
    let url = Url(path);
    let render = renderMovie.bind({ title: 'Upcoming Movies' });
    requestMovie(url, render, error);
}

function topratedMovies () {
    let path = '/movie/top_rated';
    let url = Url(path);
    let render = renderMovie.bind({ title: 'Top Rated Movies' });
    requestMovie(url, render, error);
}

function popularMovies () {
    let path = '/movie/popular';
    let url = Url(path);
    let render = renderMovie.bind({ title: 'Popular Movies' });
    requestMovie(url, render, error);
}

function nowplayingMovies () {
    let path = '/movie/now_playing';
    let render = renderMovie.bind({ title: 'Now Playing Movies' });
    requestMovie(url, render, error);
}

function latestMovies () {
    let path = '/movie/latest';
    let render = renderMovie.bind({ title: 'Latest Movies' });
    requestMovie(url, render, error);
}

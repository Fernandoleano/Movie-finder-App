let searchButton = document.querySelector('#search-movie');
let inputButton = document.querySelector('#inputValue');
let movieSearch = document.querySelector('#movie-search');
let movieContainer = document.querySelector('#movie-container');

function movieRequest(movies) {
    return movies.map((movie) => {
        return `<img 
        src=${imgUrl + movie.poster_path}
        data-movie-id=${movie.id}/>`;
    })
}

function error (error) {
    console.log("Error: ", error);
}

function movieSearchContent (movies, title = ''){
    let movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    let movieDiv = `
    <h2>${title}</h2>
    <section class="section">
        ${movieRequest(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `;

    movieElement.innerHTML = movieDiv;
    return movieElement;
};

function searchMovie (data) {
    // The data json
    movieSearch.innerHTML = '';
    let movies = data.results;
    let movieShow = movieSearchContent(movies);
    movieSearch.appendChild(movieShow);
}

function renderMovie (data) {
    // The data json
    movieSearch.innerHTML = '';
    let movies = data.results;
    let movieShow = movieSearchContent(movies, this.title);
    movieContainer.appendChild(movieShow);
}

function frameMovie (video) {
    let iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowfullscreen = true;
    return iframe;
}

searchButton.onclick = function(e) {
        e.preventDefault(); // This will not refresh the button when you click on it
        let value = inputButton.value;
        movieSearchResult(value);
        inputButton.value = '';
        console.log("value: ", value);

        
}

let input = document.getElementById("inputValue");
input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search-movie").click();
    }
});

function video (data, content) {
    content.innerHTML = `<p id="content-close">X</p>`;
    let videos = data.results;
    let length = videos.length > 4 ? 4 : videos.length;
    let iframeContainer = document.createElement('div');
    for (let i = 0; i < length; i++) {
        let video = videos[i];
        let iframe = frameMovie(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}

document.onclick = function(e) {
    // If i clicked the image do this
    let target = e.target;
    if (target.tagName.toLowerCase() === 'img') {
        let movieId = target.dataset.movieId;
        // This is for the section
        let section = e.target.parentElement;
        // This is for the section
        let content = section.nextElementSibling;
        content.classList.add('content-display');
        let path = `/movie/${movieId}/videos`;
        let url = Url(path);
        // To see movie video
        fetch(url)
        .then((res) => res.json())
        .then((data) => video(data, content))
        .catch((error) => {
            console.log('Error: ', error);
        })
    }

    if (target.id === 'content-close') {
        let content = target.parentElement;
        content.classList.remove('content-display');
    }
}

let buttonScrollTop = document.querySelector('#scrollToTop');

buttonScrollTop.addEventListener("click", function () {
    window.scrollTo({
        top: 50,
        left: 0,
        behavior: "smooth"
    });
});

function reviews() {}

upcomingMovies();
topratedMovies();
popularMovies();
nowplayingMovies();
latestMovies();
discoverMovies();

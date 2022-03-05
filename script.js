const SearchBox = document.getElementById('movie-search');
const searchList = document.getElementById('search-list');
const favList =document.getElementById('fav-list');
const resultGrid = document.getElementById('display-result');
const addbutton = document.getElementById('add-fav');

async function movieLoader(moviename){
    const url = `https://omdbapi.com/?s=${moviename}&page=1&apikey=489cacb0`;
    const res = await fetch(`${url}`);
    const data = await res.json();
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let moviename = (SearchBox.value).trim();
    if(moviename.length>0){
        searchList.classList.remove('hide-searchList');
        movieLoader(moviename);
    }else{
        searchList.classList.add('hide-searchList');
    }
}
 
function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let i = 0; i < movies.length; i++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else 
            moviePoster = "image-not-found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadDetails();
}
function loadDetails(){
    const searchMovieList = searchList.querySelectorAll('.search-list-item');
    searchMovieList.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-searcList');
            SearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=489cacb0`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}
function displayMovieDetails(movieDetails){

    resultGrid.innerHTML = `
    <div class="movie-poster">
    <img src="${(movieDetails.Poster != "N/A") ? movieDetails.Poster : "image-not-found.png"}" alt="">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${movieDetails.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${movieDetails.Year}</li>
            <li class = "rated">Ratings: ${movieDetails.Rated}</li>
            <li class = "released">Released: ${movieDetails.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${movieDetails.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${movieDetails.Writer}</p>
        <p class = "actors"><b>Actors: </b>${movieDetails.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${movieDetails.Plot}</p>
        <p class = "language"><b>Language:</b> ${movieDetails.Language}</p>
        <p class = "rating">IMDB: ${movieDetails.imdbRating} </p>  
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${movieDetails.Award}</p>
        <div class="fav">
        </div>
    </div> `;
    
}


window.addEventListener('click', (event) => {
    if(event.target.className != "searchForm"){
        searchList.classList.add('hide-searchList');

    }
});

const global = {
  currentPage: window.location.pathname,
};

const popularMovies = document.querySelector('#popular-movies');
const popularTvShows = document.querySelector('#popular-shows');
const movie = document.querySelector('#movie-details');

console.log(global.currentPage);

//Hilight active Link

function highlightActiveLink() {
  const navLink = document.querySelectorAll('.nav-link');
  navLink.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

async function displayMovie() {
  const movieId = window.location.search.split('=')[1];
  const movieDetails = await fetchAPI(`movie/${movieId}`);
  console.log(movieDetails);

  const div = document.createElement('div');
  div.classList.add('details-top');
  div.innerHTML = `<div>

 ${
   movieDetails.poster_path
     ? `<img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}"
     class="card-img-top"
     alt=${movieDetails.original_title}
   />`
     : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="Movie Title"
      />`
 }   
    </div>
    <div>
      <h2>${movieDetails.original_title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        8 / 10
      </p>
      <p class="text-muted">Release Date: ${movieDetails.release_date}</p>
      <p>
       ${movieDetails.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movieDetails.genres.map((genre) => `<li>${genre.name}</li>`)}
      </ul>
      <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>${movieDetails}</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span>${movieDetails.budget}</li>
      <li><span class="text-secondary">Revenue:</span> ${
        movieDetails.revenue
      }</li>
      <li><span class="text-secondary">Runtime:</span> ${
        movieDetails.runtime
      }</li>
      <li><span class="text-secondary">Status:</span> ${
        movieDetails.status
      }</li>
    </ul>
    <h4>${movieDetails}</h4>
    <div class="list-group">${movieDetails}</div>
  </div> `;
  movie.appendChild(div);
}

//displayPopular movies

async function displayPopularMovies() {
  const { results } = await fetchAPI('movie/popular');
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement('div');

    div.classList.add('card');
    div.innerHTML = `<div class="card">
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt=${movie.original_title}
        />`
            : `<img src="../images/no-image.jpg"  class="card-img-top"
        alt="movie-title">`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.original_title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    </div>`;
    popularMovies.appendChild(div);
  });
}

async function displayPopularTvShows() {
  const { results } = await fetchAPI('tv/popular');
  console.log(results);
  results.forEach((tv) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<div class="card">
      <a href="movie-details.html?id=${tv.id}">
        ${
          tv.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
          class="card-img-top"
          alt=${tv.original_name}
        />`
            : `<img src="../images/no-image.jpg"  class="card-img-top"
        alt="movie-title">`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${tv.original_name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${tv.first_air_date}</small>
        </p>
      </div>
    </div>`;
    popularTvShows.appendChild(div);
  });
}

//Fetch data from TMDB API

async function fetchAPI(endPoint) {
  const API_KEY = '2c2afc564662d379d502e79a0db6eedb';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();
  const res = await fetch(
    `${API_URL}${endPoint}?api_key=${API_KEY}&language=en-us`
  );
  const data = await res.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Init App

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;

    case '/shows.html':
      displayPopularTvShows();
      break;

    case '/movie-details.html':
      displayMovie();
      break;
    case '/tv-details.html':
      console.log('tv details');
      break;
    case '/search.html':
      console.log('search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);

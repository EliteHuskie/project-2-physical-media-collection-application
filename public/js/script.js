// Pre-requisites for the search to function properly
require('dotenv').config();
const apiKey = process.env.TMDB_API_KEY;

// Function to search for the Movies + TV Shows that a user searches for
async function searchMoviesAndTVShows() {
    const searchQuery = document.getElementById('searchInput').value;

    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`;
    const tvShowUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`;

    try {
        const movieResponse = await fetch(movieUrl);
        const tvShowResponse = await fetch(tvShowUrl);

        const movieData = await movieResponse.json();
        const tvShowData = await tvShowResponse.json();

        displayResults(movieData.results, tvShowData.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function that will Display Results for Movies + TV Shows based on the users input
function displayResults(movies, tvShows) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    movies.forEach(item => {
        const resultCard = createResultCard(item.title, item.poster_path, item.overview);
        resultsContainer.appendChild(resultCard);
    });

    tvShows.forEach(item => {
        const resultCard = createResultCard(item.name, item.poster_path, item.overview);
        resultsContainer.appendChild(resultCard);
    });
}

// Function to create the result card on page after it finds the required Movies + TV Shows
function createResultCard(title, posterPath, overview) {
    const resultCard = document.createElement('div');
    resultCard.classList.add('result-card');
    resultCard.innerHTML = `
        <h2>${title}</h2>
        <img src="https://image.tmdb.org/t/p/w500/${posterPath}" alt="${title} Poster">
        <p>${overview}</p>
    `;
    return resultCard;
}
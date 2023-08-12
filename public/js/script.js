// Pre-requisites for the search to function properly
require("dotenv").config();
const tmdbApiKey = process.env.TMDB_API_KEY;
const googleApiKey = process.env.GOOGLE_API_KEY;

// Function to search for the Movies + TV Shows that a user searches for
async function searchMoviesAndTVShows() {
  const searchQuery = document.getElementById("searchInput").value;

  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(
    searchQuery
  )}`;
  const tvShowUrl = `https://api.themoviedb.org/3/search/tv?api_key=${tmdbApiKey}&query=${encodeURIComponent(
    searchQuery
  )}`;

  try {
    const movieResponse = await fetch(movieUrl);
    const tvShowResponse = await fetch(tvShowUrl);

    const movieData = await movieResponse.json();
    const tvShowData = await tvShowResponse.json();

    displayResults(movieData.results, tvShowData.results, "moviesAndTVShows");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to search for Books based on the users input
async function searchBooks() {
  const searchQuery = document.getElementById("searchInput").value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchQuery
  )}&key=${googleApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    displayResults(data.items, null, "books");
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
}

// Function that will Display Results for Movies + TV Shows or Books based on the users input
function displayResults(results, tvShows, type) {
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";

  if (type === "moviesAndTVShows") {
    results.forEach((item) => {
      const resultCard = createResultCard(
        item.title,
        item.poster_path,
        item.overview,
        null,
        null,
        type
      );
      resultsContainer.appendChild(resultCard);
    });

    tvShows.forEach((item) => {
      const resultCard = createResultCard(
        item.name,
        item.poster_path,
        item.overview,
        null,
        null,
        type
      );
      resultsContainer.appendChild(resultCard);
    });
  } else if (type === "books") {
    results.forEach((book) => {
      const resultCard = createResultCard(
        book.volumeInfo.title,
        null,
        book.volumeInfo.description,
        book.volumeInfo.authors,
        book.volumeInfo.imageLinks.thumbnail,
        type
      );
      resultsContainer.appendChild(resultCard);
    });
  }
}

// Function to create the result card on page after it finds the requested content
function createResultCard(
  title,
  posterPath,
  overview,
  authors,
  thumbnail,
  type
) {
  const resultCard = document.createElement("div");
  resultCard.classList.add("result-card");

  let contentHTML = `
        <h2>${title}</h2>
        <p>${overview}</p>
    `;

  if (type === "moviesAndTVShows") {
    contentHTML += `<img src="https://image.tmdb.org/t/p/w500/${posterPath}" alt="${title} Poster">`;
  } else if (type === "books") {
    contentHTML += `
            <p>Author(s): ${authors ? authors.join(", ") : "Unknown"}</p>
            <img src="${thumbnail}" alt="${title} Cover">
        `;
  }

  resultCard.innerHTML = contentHTML;
  return resultCard;
}

// Event handler for search button click
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleSearchButtonClick);

function handleSearchButtonClick() {
  const searchType = document.querySelector(
    'input[name="searchType"]:checked'
  ).value;

  if (searchType === "moviesAndTVShows") {
    searchMoviesAndTVShows();
  } else if (searchType === "books") {
    searchBooks();
  }
}

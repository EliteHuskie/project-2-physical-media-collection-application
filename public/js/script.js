// Pre-requisites for the search to function properly
// const tmdbApiKey = 'api_key_tmdb'
const tmdbApiKey = "818371936113359a4fd88312064667b0";
// const googleApiKey = 'api_key_google'
const googleApiKey = "AIzaSyCG-nyR7-vk8JJ1_jtKuGoedYTpx9aE2kI";

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
        "movies"
      );
      resultsContainer.appendChild(resultCard[0]);
      resultsContainer.appendChild(resultCard[1]);
    });

    tvShows.forEach((item) => {
      const resultCard = createResultCard(
        item.name,
        item.poster_path,
        item.overview,
        null,
        null,
        "tvShows"
      );
      resultsContainer.appendChild(resultCard[0]);
      resultsContainer.appendChild(resultCard[1]);
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
      resultsContainer.appendChild(resultCard[0]);
      resultsContainer.appendChild(resultCard[1]);
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
  resultCard.classList.add("card", "flex-row");
  resultCard.style = "height: 300px; width:250px";
  console.log(resultCard.style);
  resultCard.id = `${title.replaceAll(" ", "-")}_front`;

  const resultCardBack = document.createElement("div");
  resultCardBack.classList.add("card", "flex-row");
  resultCardBack.style = "height: 300px; width:250px";
  resultCardBack.style.display = "none";
  resultCardBack.id = `${title.replaceAll(" ", "-")}_back`;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let contentHTML = `
        <h4>${title}</h4>
        <p>${overview}</p>
    `;
  let imgHTML;

  if (type === "movies" || type === "tvShows") {
    imgHTML = `<img src="https://image.tmdb.org/t/p/w500/${posterPath}" alt="${title} Poster" width=200>`;
  } else if (type === "books") {
    contentHTML += `
            <p>Author(s): ${authors ? authors.join(", ") : "Unknown"}</p>
        `;
    imgHTML = `<img src="${thumbnail}" alt="${title} Cover" class="card-img"></img>`;
  }

  const addBttn = document.createElement("button");
  addBttn.innerHTML = "Add";
  addBttn.id = "addToCollection";

  resultCard.innerHTML = imgHTML;
  cardBody.innerHTML = contentHTML;
  cardBody.appendChild(addBttn);
  resultCardBack.appendChild(cardBody);
  resultCardBack.dataset.type = type;
  return [resultCard, resultCardBack];
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

function handleSearchFormSubmit() {
  const searchType = document.querySelector(
    'input[name="searchType"]:checked'
  ).value;
  const searchInput = document.getElementById("searchInput").value;

  // Clear previous search results
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";

  if (searchType === "moviesAndTVShows") {
    searchMoviesAndTVShows();
  } else if (searchType === "books") {
    searchBooks();
  }
}

// "Flip" card on click
const searchResultsContainer = document.getElementById("searchResults");

searchResultsContainer.addEventListener("click", (event) => {
  if (event.target.id === "addToCollection") {
    addMediaToCollection(event.target);
    return;
  }

  let clickedCard = event.target.parentElement;

  //   If currently showing "back" of card, clicked element might be the card-body, so change to card element
  if (clickedCard.className.includes("card-body")) {
    clickedCard = clickedCard.parentElement;
  } else if (!clickedCard.className.includes("card")) {
    return;
  }
  const clickedCardId = clickedCard.id;

  //   Get card's other side id
  let oppositeId;
  if (clickedCardId.split("_")[1] == "front") {
    oppositeId = `${clickedCardId.split("_")[0]}_back`;
  } else {
    oppositeId = `${clickedCardId.split("_")[0]}_front`;
  }

  //   "Flip" card
  clickedCard.style.display = "none";
  const clickedCardOpposite = document.getElementById(oppositeId);
  clickedCardOpposite.style.display = "flex";
  return;
});

// Add media to collection
function addMediaToCollection(target) {
  const model = target.dataset.type;

  // fetch(`/api/${model}`, {
  //   method: "POST",
  // })

  // fetch("/api/collections/1", {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ `${model}_ids`: })
  // })
}

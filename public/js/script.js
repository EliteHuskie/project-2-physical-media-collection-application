// Pre-requisites for the search to function properly
// const tmdbApiKey = process.env.tmdbApiKey;
const tmdbApiKey = "818371936113359a4fd88312064667b0";
// const googleApiKey = process.env.googleApiKey;
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
  const infoContainer = document.getElementById("infoContainer");
  resultsContainer.innerHTML = "";

  let cardCount = 0;
  if (type === "moviesAndTVShows") {
    results.forEach((item) => {
      cardCount += 1;
      const resultCard = createResultCard(
        item.title,
        item.poster_path,
        item.overview,
        null,
        null,
        "movies",
        cardCount
      );
      resultsContainer.appendChild(resultCard[0]);
      infoContainer.appendChild(resultCard[1]);
    });

    tvShows.forEach((item) => {
      cardCount += 1;
      const resultCard = createResultCard(
        item.name,
        item.poster_path,
        item.overview,
        null,
        null,
        "tvShows",
        cardCount
      );
      resultsContainer.appendChild(resultCard[0]);
      infoContainer.appendChild(resultCard[1]);
    });
  } else if (type === "books") {
    results.forEach((book) => {
      cardCount += 1;
      const resultCard = createResultCard(
        book.volumeInfo.title,
        null,
        book.volumeInfo.description,
        book.volumeInfo.authors,
        book.volumeInfo.imageLinks.thumbnail,
        type,
        cardCount
      );
      resultsContainer.appendChild(resultCard[0]);
      infoContainer.appendChild(resultCard[1]);
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
  type,
  cardNum
) {
  const resultCard = document.createElement("div");
  resultCard.classList.add("card", "flex-row");
  resultCard.style = "height: 300px; width:202px; padding:0";
  resultCard.id = `${title.replaceAll(" ", "-")}-${cardNum}_front`;

  const resultCardBack = document.createElement("div");
  resultCardBack.classList.add("card", "card-back", "flex-row");
  resultCardBack.style.display = "none";
  resultCardBack.id = `${title.replaceAll(" ", "-")}-${cardNum}_back`;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let contentHTML;
  let imgHTML;

  if (type === "movies" || type === "tvShows") {
    contentHTML = `
    <h4>${title}</h4>
    <p>${overview}</p>
`;
    imgHTML = `<img src="https://image.tmdb.org/t/p/w500/${posterPath}" alt="${title} Poster" width=200>`;
  } else if (type === "books") {
    contentHTML = `
            <h4>${title}</h4>
            <h6>Author(s): ${authors ? authors.join(", ") : "Unknown"}</h6>
            <p>${overview}</p>
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
const infoContainer = document.getElementById("infoContainer");

searchResultsContainer.addEventListener("click", (event) => {
  let clickedCard = event.target.parentElement;

  //   If currently showing "back" of card, clicked element might be the card-body, so change to card element
  if (clickedCard.className.includes("card-body")) {
    clickedCard = clickedCard.parentElement;
  } else if (!clickedCard.className.includes("card")) {
    return;
  }
  const clickedCardId = clickedCard.id;

  //   Get card's other side id
  let oppositeId = `${clickedCardId.split("_")[0]}_back`;

  //  If showing, hide. If hidden, display
  const clickedCardOpposite = document.getElementById(oppositeId);
  if (clickedCardOpposite.style.display == "none") {
    clickedCardOpposite.style.display = "flex";
  } else {
    clickedCardOpposite.style.display = "none";
  }
  return;
});

infoContainer.addEventListener("click", (event) => {
  if (event.target.id === "addToCollection") {
    addMediaToCollection(event.target);
    return;
  }
});

// Add media to collection
async function addMediaToCollection(target) {
  const collectionId = localStorage.getItem("collectionClicked");

  const cardEl = target.parentElement.parentElement;
  const model = cardEl.dataset.type;
  const name = cardEl.querySelector("h4").innerHTML;
  const cardFrontEl = document.getElementById(
    `${cardEl.id.split("_")[0]}_front`
  );

  fetch(`/api/${model}/name/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      let mediaId;
      if (response.status === 404) {
        let data;
        if (cardEl.querySelector("h6")) {
          data = {
            name: name,
            creator: cardEl.querySelector("h6").innerHTML,
            overview: cardEl.querySelector("p").innerHTML,
            image_url: cardFrontEl.querySelector("img").src
              ? cardFrontEl.querySelector("img").src
              : null,
          };
        } else {
          data = {
            name: name,
            overview: cardEl.querySelector("p").innerHTML,
            image_url: cardFrontEl.querySelector("img").src
              ? cardFrontEl.querySelector("img").src
              : null,
          };
        }

        mediaId = await addMediaToDB(model, data);
      } else if (response.status === 200) {
        data = await response.json();
        mediaId = data.id;
      } else {
        const responseData = await response.json();
        return responseData;
      }

      let body;
      if (model === "movies") {
        body = {
          mediaIds: {
            movieIds: [mediaId],
          },
        };
      } else if (model === "tvShows") {
        body = {
          mediaIds: {
            showIds: [mediaId],
          },
        };
      } else {
        body = {
          mediaIds: {
            bookIds: [mediaId],
          },
        };
      }

      fetch(`/api/collections/${collectionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) => {
        if (!response.ok) {
          console.log(response);
          return;
        }

        window.location.href = "/home";
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// Add media to corresponding model
async function addMediaToDB(mediaType, mediaInfo) {
  let id;
  await fetch(`/api/${mediaType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mediaInfo),
  })
    .then((response) => response.json())
    .then((data) => (id = data.id))
    .catch((error) => {
      console.log(error);
    });

  return id;
}

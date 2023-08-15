// -------- Functions -------- //

function displayCollections(jsonData) {
  // if no collections, display just text
  if (!jsonData.length) {
    const collectionContainerEl = document.createElement("div");
    collectionContainerEl.className = "container overRide";

    const newHeadlineContainer = document.createElement("div");
    newHeadlineContainer.className = "Content";

    const textEl = document.createElement("h4");
    textEl.className = "my-collection";
    textEl.innerHTML =
      "You have no collections. Add a new collection using the dropdown menu.";

    newHeadlineContainer.appendChild(textEl);
    collectionContainerEl.appendChild(newHeadlineContainer);
    return;
  }

  let toStore = [];

  for (collection of jsonData) {
    toStore.push({ id: collection.id, name: collection.collection_name });

    // create containers and headline elements
    const collectionContainerEl = document.createElement("div");
    collectionContainerEl.className = "container overRide";
    collectionContainerEl.id = collection.id;

    const divEl = document.createElement("div");
    const headlineContainer = document.createElement("h4");
    divEl.className = "Content";
    headlineContainer.innerHTML = collection.collection_name;

    divEl.appendChild(headlineContainer);

    const cardsContainer = document.createElement("div");
    cardsContainer.className =
      "container px-4 text-center row justify-content-left gap-2";

    // if user uploaded an image, display first
    if (collection.image_url) {
      const uploadCard = document.createElement("div");
      uploadCard.className = "card flex-row uploadCard";
      uploadCard.style = "height: 300; width:300";
      uploadCard.style.backgroundImage = `url(${collection.image_url})`;
      uploadCard.style.backgroundRepeat = "no-repeat";
      uploadCard.style.backgroundSize = "contain";
      uploadCard.style.backgroundPosition = "bottom";
      uploadCard.id = `${collection.collection_name.replaceAll(
        " ",
        "-"
      )}-0_front`;

      const textDiv = document.createElement("div");
      textDiv.className = "uploadCard-overlay";

      const textEl = document.createElement("h5");
      textEl.innerHTML = "My Collection";

      textDiv.appendChild(textEl);
      uploadCard.appendChild(textDiv);
      cardsContainer.appendChild(uploadCard);
    }

    // create an array with all items in collection
    itemArray = collection.Books.concat(collection.Movies, collection.Shows);

    cardCount = 0;
    // loop through items and create a card for each
    for (item of itemArray) {
      cardCount += 1;

      const card = document.createElement("div");
      card.className = "card flex-row";
      card.style = "height: 300; width:202; padding: 0px";
      card.id = `${collection.collection_name.replaceAll(
        " ",
        "-"
      )}-${cardCount}_front`;
      card.dataset.dbId = collection.id;

      const cardBack = document.createElement("div");
      cardBack.className = "card card-back flex-row";
      cardBack.style.display = "none";
      cardBack.id = `${collection.collection_name.replaceAll(
        " ",
        "-"
      )}-${cardCount}_back`;
      cardBack.dataset.dbId = collection.id;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const titleEl = document.createElement("h4");
      const creatorEl = document.createElement("h6");
      const paragraphEl = document.createElement("p");
      const deleteBttn = document.createElement("button");
      titleEl.innerHTML = item.name;
      creatorEl.innerHTML = `<i>${item.creator}</i>`;
      paragraphEl.innerHTML = item.overview;
      deleteBttn.innerHTML = "Remove";
      deleteBttn.id = item.id;

      //   add media type to data
      let mediaType;
      if (item.Movie_collection) {
        mediaType = "movie";
      } else if (item.Book_collection) {
        mediaType = "book";
      } else {
        mediaType = "show";
      }
      deleteBttn.dataset.type = mediaType;

      cardBody.appendChild(titleEl);
      cardBody.appendChild(creatorEl);
      cardBody.appendChild(paragraphEl);
      cardBody.appendChild(deleteBttn);

      if (item.image_url) {
        const imgEl = document.createElement("img");
        imgEl.className = "card-img-center";
        imgEl.src = item.image_url;
        imgEl.width = 200;
        card.appendChild(imgEl);
      }

      cardBack.appendChild(cardBody);

      cardsContainer.appendChild(card);
      infoContainer.appendChild(cardBack);
    }

    // Add a placeholder card for adding media
    const phcard = document.createElement("div");
    phcard.classList = "placeholder-card";
    phcard.id = collection.id;

    // Add a delete card
    const deleteCard = document.createElement("div");
    deleteCard.className = "delete-card fa";
    deleteCard.innerHTML =
      '<i class="fa fa-trash-o" style="font-size:36px; color:darkred;"></i>';
    deleteCard.id = collection.id;

    collectionContainerEl.appendChild(divEl);
    cardsContainer.appendChild(phcard);
    cardsContainer.appendChild(deleteCard);
    collectionContainerEl.appendChild(cardsContainer);

    collectionsContainer.appendChild(collectionContainerEl);
  }

  localStorage.setItem("collections", JSON.stringify(toStore));
  return;
}

async function uploadToCloudinary(imageData, collectionName) {
  let url;
  await fetch("/api/upload-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: imageData,
      collection_name: collectionName,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        throw new Error();
      }

      url = data;
    });

  return url;
}

async function deleteCollection(collId) {
  fetch(`/api/collections/${collId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/home";
      }
    })
    .catch((error) => console.log(error));
}

async function getCollectionMediaIds(collId) {
  let ids;

  await fetch(`/api/collections/${collId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response);
      }

      return response.json();
    })
    .then((data) => {
      const movies = data.Movies.map(({ id }) => id);
      const shows = data.Shows.map(({ id }) => id);
      const books = data.Books.map(({ id }) => id);

      ids = {
        movieIds: movies,
        showIds: shows,
        bookIds: books,
      };
    });

  return ids;
}

// -------------------- //

// Load user's collections on login
fetch("/api/collections", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => displayCollections(data));

// Create a collection
const collectionNameInputEl = document.getElementById("newCollectionName");
const saveCollectionBttn = document.getElementById("saveNewCollection");

saveCollectionBttn.addEventListener("click", async (event) => {
  const collectionName = collectionNameInputEl.value;
  const imgData = document.getElementById("newCollectionImage").files[0];

  if (imgData) {
    const imgReader = new FileReader();
    imgReader.readAsDataURL(imgData);

    //   convert uploaded image to a data url
    imgReader.addEventListener("load", async () => {
      const imgUrl = await uploadToCloudinary(imgReader.result, collectionName);
      console.log(imgUrl);

      // create the collection
      fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collection_name: collectionName,
          image_url: `${imgUrl}`,
        }),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          window.location.href = "/home";
        });
    });
  } else {
    fetch("/api/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collection_name: collectionName,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.href = "/home";
      });
  }
});

// Show card info on click or add card
const collectionsContainer = document.getElementById("collectionsContainer");
const infoContainerEl = document.getElementById("infoContainer");

collectionsContainer.addEventListener("click", (event) => {
  // if placeholder card was clicked, switch to search page
  if (event.target.classList[0] === "placeholder-card") {
    localStorage.setItem("collectionClicked", event.target.id);
    window.location.href = "/results";
    // if delete card was clicked, delete collection
  } else if (
    event.target.classList[0] === "delete-card" ||
    event.target.classList[1] === "fa-trash-o"
  ) {
    if (confirm("Are you sure you want to delete this collection?")) {
      const cardEl =
        event.target.classList[0] === "delete-card"
          ? event.target
          : event.target.parentElement;
      deleteCollection(cardEl.id);
    }
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
  let oppositeId = `${clickedCardId.split("_")[0]}_back`;

  //   Hide/Show info card
  const clickedCardOpposite = document.getElementById(oppositeId);
  if (clickedCardOpposite.style.display == "none") {
    clickedCardOpposite.style.display = "flex";
  } else {
    clickedCardOpposite.style.display = "none";
  }
  return;
});

// Remove a card from collection
infoContainerEl.addEventListener("click", async (event) => {
  if (event.target.tagName === "BUTTON") {
    const collectionId = event.target.parentElement.parentElement.dataset.dbId;
    const mediaId = event.target.id;
    const mediaType = event.target.dataset.type;

    const mediaIds = await getCollectionMediaIds(collectionId);

    const oldIdArray = mediaIds[`${mediaType}Ids`];
    const newIdArray = oldIdArray.filter((id) => id === mediaId);
    mediaIds[`${mediaType}Ids`] = newIdArray;

    fetch(`/api/collections/${collectionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mediaIds: mediaIds,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }

        window.location.href = "/home";
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

//about us button
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

// Contact us submit response
$("#contactUsSubmit")
  .unbind()
  .bind("click", function () {
    $("#contactUsResponse").text("Thank you for your submission!");
    setTimeout(function () {
      $("#contactUsResponse").text("");
      $(".contact-us .btn-close").click();
    }, 2000);
  });
// cancel button response
$(".cancelBtn")
  .unbind()
  .bind("click", function () {
    setTimeout(function () {
      $(".btn-close").click();
    }, 1000);
  });
// save button response
$(".save")
  .unbind()
  .bind("click", function () {
    setTimeout(function () {
      $(".btn-close").click();
    }, 2000);
  });
// Delete my account button response
$(".remove")
  .unbind()
  .bind("click", function () {
    setTimeout(function () {
      $(".btn-close").click();
    }, 3000);
  });

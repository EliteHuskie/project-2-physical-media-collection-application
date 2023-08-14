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

  for (collection of jsonData) {
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

    // create an array with all items in collection
    itemArray = collection.Books.concat(collection.Movies, collection.Shows);

    cardCount = 0;
    // loop through items
    for (item of itemArray) {
      cardCount += 1;

      const card = document.createElement("div");
      card.className = "card flex-row";
      card.style = "height: 300; width:250";
      card.id = `${collection.collection_name.replaceAll(
        " ",
        "-"
      )}-${cardCount}_front`;

      const cardBack = document.createElement("div");
      cardBack.className = "card flex-row";
      cardBack.style = "height: 300; width:250";
      cardBack.style.display = "none";
      cardBack.id = `${collection.collection_name.replaceAll(
        " ",
        "-"
      )}-${cardCount}_back`;

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
      cardsContainer.appendChild(cardBack);
    }

    collectionContainerEl.appendChild(divEl);
    collectionContainerEl.appendChild(cardsContainer);

    collectionsContainer.appendChild(collectionContainerEl);
  }

  return;
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

saveCollectionBttn.addEventListener("click", (event) => {
  const collectionName = collectionNameInputEl.value;

  fetch("/api/collections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ collection_name: collectionName }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "/home";
    });
});

// "Flip" card on click
const collectionsContainer = document.getElementById("collectionsContainer");

collectionsContainer.addEventListener("click", (event) => {
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

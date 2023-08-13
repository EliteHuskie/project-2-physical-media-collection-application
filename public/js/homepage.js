// -------- Functions -------- //

function displayCollections(jsonData) {
  const collectionsContainer = document.getElementById("collectionsContainer");

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

  console.log(jsonData);
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

    // loop through items
    for (item of itemArray) {
      const card = document.createElement("div");
      card.className = "placeholder-card";

      const titleEl = document.createElement("h4");
      const creatorEl = document.createElement("h6");
      const paragraphEl = document.createElement("p");
      titleEl.innerHTML = item.name;
      creatorEl.innerHTML = item.creator;
      paragraphEl.innerHTML = item.overview;

      if (item.image_url) {
        const imgEl = document.createElement("img");
        imgEl.src = item.image_url;
        imgEl.width = 200;
        card.appendChild(imgEl);
      }

      card.appendChild(titleEl);
      card.appendChild(creatorEl);
      card.appendChild(paragraphEl);

      cardsContainer.appendChild(card);
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

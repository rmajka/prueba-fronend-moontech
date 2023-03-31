const allDrinks = []; //sava all drinks

const getInputDataFromUser = document.querySelector(".input"); //get user input
let filteredItems = [];
//gat all drinks
function getDrinksData() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s")
    .then((response) => response.json())
    .then((data) => {
      allDrinks.push(...data.drinks);
      console.log("All drinks: ", allDrinks);
    })
    .catch((error) => console.error(error));
}

getDrinksData(); // call and get data

//hide, show filter
const ocultarFiltroBtn = document.querySelector(".ocultar-filtro-btn");
const form = document.querySelector(".form");

ocultarFiltroBtn.addEventListener("click", () => {
  if (form.style.display === "none") {
    form.style.display = "flex";
    ocultarFiltroBtn.textContent = "Ocultar filtro";
  } else {
    form.style.display = "none";
    ocultarFiltroBtn.textContent = "Ver filtro";
  }
});

//show details
function showDetailsHandler(name) {
  const filterById = allDrinks.filter((item) => item.strDrink == name);
  if (filterById.length !== 0) {
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = "";

    mainContent.innerHTML = filterById.map((item) => {
      //gat all Ingredients

      return `<div class="show-item-container">
       <img class="top-logo" src="${`../images//Captura de pantalla 2023-03-31 134421.png`}" />
      <h4>${item.strDrink}</h4>
        <img class="item-img-details" src="${item.strDrinkThumb}" alt="drink" />
        <h4>Instrucciones</h4>
        <p>${item.strInstructions}</p>
        <div class="bottom-container">
        <div class="left">
        <h5>Ingredientes</h5>
        </div>
        <div class="right">
        <h5>Meadure</h5>

        </div>
        </div>
        <button class="volver-btn">Volver</button>
      </div>`;
    });
    //go back
    const volverBtn = document.querySelector(".volver-btn");
    volverBtn.addEventListener("click", () => {
      mainContent.innerHTML = "";
    });
  }
}

//change laber value
const select = document.querySelector("#buscar");
const label = document.querySelector(".inputLabel");
select.addEventListener("change", (event) => {
  event.preventDefault();
  const val = event.target.value;
  const capitalizedStr = val.charAt(0).toUpperCase() + val.slice(1);
  label.textContent = capitalizedStr;
});

const formButton = document.querySelector(".form-btn");
formButton.addEventListener("click", function (event) {
  //get value from select
  const dropdown = document.getElementById("buscar");
  const inputValue = getInputDataFromUser.value.toLowerCase();

  event.preventDefault();
  //searching conditions
  let buscarPor = dropdown.value;

  //adjust searching item property to api
  if (buscarPor == "nombre") {
    buscarPor = "strDrink";
  } else if (buscarPor == "vaso") {
    buscarPor = "strGlass";
  } else if (buscarPor == "ingrediente") {
    buscarPor = "strIngredient1";
  } else if (buscarPor == "categoria") {
    buscarPor = "strCategory";
  }

  //filter all data
  filteredItems = allDrinks.filter(
    //important to cast to lowercase in order to make comparation
    (item) => item[buscarPor].toLowerCase() == inputValue.toLowerCase()
  );

  // update the UI with the filtered drinks
  const mainContent = document.querySelector(".main-content");
  mainContent.innerHTML = filteredItems
    .map(
      (item) =>
        `<div class="itemDrink">
        <img class="item-img" src="${item.strDrinkThumb}" alt="drink" />
        <span class="drink-name">${item.strDrink}</span>
        <button class="item-btn" data-name="${item.strDrink}">Ver detalles</button>
      </div>`
    )
    .join("");

  // show details of the item
  const itemButtons = document.querySelectorAll(".item-btn");
  itemButtons.forEach((itemButton) => {
    itemButton.addEventListener("click", function (event) {
      const itemName = event.currentTarget.dataset.name;
      showDetailsHandler(itemName);
    });
  });
});

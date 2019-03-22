import { elements } from "./index";

//this will have a bunch of functions regarding the search view -- export all of them using named exports

//return the input value of the field, select the value and return it
const getInput = () => elements.searchInput.value;

const clearInput = () => {
  elements.searchInput.value = "";
};

const clearResults = () => {
  elements.searchResList.innerHTML = "";
  //clear buttons
  elements.searchResPages.innerHTML = "";
};

const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach(el => {
    el.classList.remove("results__link--active");
  });

  document
    .querySelector(`a[href="#${id}"]`)
    .classList.add("results__link--active"); //use css selectors with all links with the attribute href
};

/*
    //Pasta with tomato and spinach iteration in    limitRecipeTitle function
    acc = 0 / acc + curr.length = 5 / newTitle =['Pasta']
    acc = 5 / acc + curr.length = 9 / newTitle['Pasta', 'with']
    acc = 9 / acc + curr.length = 15 / newTitle['Pasta', 'with', 'tomato']
    acc = 15 / acc + curr.length >= 18 / newTitle['Pasta', 'with', 'tomato']
*/

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  //test the length of the title is longer than he limit
  if (title.length > limit) {
    //split the title into words and use reduce on the array and use accumulator in each iteration
    title.split(" ").reduce((acc, curr) => {
      if (acc + curr.length <= limit) {
        newTitle.push(curr);
      }
      return acc + curr.length;
    }, 0);

    //return the result
    return `${newTitle.join(" ")}...`; //puts the array into sentence
  }
  return title;
};

//type: 'prev' or 'next' --data-goto is used for event handler
const createButton = (page, type) => `

        <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${
                  type === "prev" ? "left" : "right"
                }"></use>
            </svg>
        </button>

`;

//function for rendering the buttons, call this from renderresults -- if we're on page 1 it should show next btn, page 2 should show page next and prev etc... -- need to know how many pages there are and which page we are on. Number of pages = numResults / resPerPage

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage); //ceil: 4.5 => 5

  let button;
  //logic
  if (page === 1 && pages > 1) {
    //button to go to next page
    button = createButton(page, "next");
  } else if (page < pages) {
    //both buttons
    button = `${createButton(page, "next")}${createButton(page, "prev")}`;
  } else if (page === pages && pages > 1) {
    //button go to prev page at the last page
    button = createButton(page, "prev");
  }

  //insert element into DOM under results__pages div

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

//function to render one recipe -- private function
const renderRecipe = recipe => {
  const markup = `
    <li>
                      <a class="results__link" href="#${recipe.recipe_id}">
                          <figure class="results__fig">
                              <img src="${recipe.image_url}" alt="${
    recipe.title
  }">
                          </figure>
                          <div class="results__data">
                              <h4 class="results__name">${limitRecipeTitle(
                                recipe.title
                              )}</h4>
                              <p class="results__author">${recipe.publisher}</p>
                          </div>
                      </a>
                  </li>
      `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup); //replace in markup
};

//loop thru all 30 results and call renderRecipe function for each individual recipe, page and results per page arugment for pagination

const renderResults = (recipes, page = 1, resPerPage = 10) => {
  //display results per page, take a part of the recipes array using slice

  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  console.log(recipes);
  recipes.slice(start, end).forEach(renderRecipe);

  //render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};

module.exports = {
  getInput,
  renderResults,
  clearInput,
  clearResults,
  highlightSelected
};

import { elements } from "./index";

//this will have a bunch of functions regarding the search view -- export all of them using named exports

//return the input value of the field, select the value and return it
const getInput = () => elements.searchInput.value;

const clearInput = () => {
  elements.searchInput.value = "";
};

const clearResults = () => {
  elements.searchResList.innerHTML = "";
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

  recipes.slice(start, end).forEach(renderRecipe);
};

module.exports = {
  getInput,
  renderResults,
  clearInput,
  clearResults
};

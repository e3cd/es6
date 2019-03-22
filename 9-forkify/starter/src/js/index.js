// Global app controller

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
//import all function form searchView
import { elements, renderLoader, clearLoader } from "./views/index";

// global state of the app -- store of redux
/*
 - search object
 - current recipe object
 - shopping list object
 - liked recipes
*/
const state = {};
/*
 * SEARCH CONTROLLER
 */

//function called when the form is submitted

const controlSearch = async () => {
  // 1. Get the query from the view
  const query = searchView.getInput();
  //if there is a query we want to create a search object

  if (query) {
    //2) new search object and add to state
    state.search = new Search(query);

    //3.Prepare UI for results
    searchView.clearInput();
    searchView.clearResults(); //clear the list
    renderLoader(elements.searchRes); //pass in a parent element of searchRes in renderLoader function as argument

    try {
      //4. Search for recipes
      await state.search.getResults();

      //5. Render results on UI -- only to happen when we recieve the results from api, so await 4.

      clearLoader();
      searchView.renderResults(state.search.result); //result from Search Model
    } catch (error) {
      console.log(error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault(); //prevent default from refershing
  controlSearch();
});

//use event delegation to attach event listener on parent element results page

elements.searchResPages.addEventListener("click", e => {
  //use closest method to select all DOM elements that match selected parameter
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10); //base 10
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/*
 * RECIPE CONTROLLER
 */

//clicking on each result item gives a hashed id in the url. Use the hashchange event listener which is fired when the hash changes

// function that handles recipe

const controlRecipe = async () => {
  //get the hash using location.hash -- location is the entire url,
  const id = window.location.hash.replace("#", ""); //only want the id so use the replace string method to remove hash and replace with nothing

  if (id) {
    // prepare ui for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe); //pass in the parent element

    //highlight selected search item
    if (state.search) {
      searchView.highlightSelected(id);
    }

    //create new recipe object
    state.recipe = new Recipe(id);

    try {
      //get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      clearLoader();
      console.log(state.recipe);
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      console.log(error);
    }
  }
};

//add to global js object

// window.addEventListener('hashchange', controlRecipe)
// //add eventlistener to the load event to save the url
// window.addEventListener('load', controlRecipe)

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

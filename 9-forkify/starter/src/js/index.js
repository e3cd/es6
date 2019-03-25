// Global app controller

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";

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
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id)); //need to pass in isliked when we render the recipe
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

/*
 * LIST CONTROLLER
 */

const controlList = () => {
  //create a new list if there is none yet
  if (!state.list) state.list = new List();

  //Add each ingredient to the list by looping through ingredients array and adding them to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

/*
 * LIKES CONTROLLER
 */

const controlLikes = () => {
  //create new likes object only if its not there
  if (!state.likes) state.likes = new Likes();

  const currentID = state.recipe.id;

  if (!state.likes.isLiked(currentID)) {
    //USER HAS NOT YET LIKED CURRENT RECIPE

    //add like to state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    //toggle the like button
    likesView.toggleLikeBtn(true);

    //add like to the ui list
    likesView.renderLike(newLike);

    console.log(state.likes);
  } else {
    //USER HAS LIKED THE CURRENT RECIPE
    //remove like from the state
    state.likes.deleteLike(currentID);
    //toggle the like button
    likesView.toggleLikeBtn(false);

    //remove like to the UI list
    likesView.deleteLike(currentID);
    // console.log(state.likes);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//use event delegation on recipe class to add eventhandler to recipe servings update button as the buttons do not exist when the page is loading. Use matches to match the btn-decrease class and its child elements * that is selected for the event

//handle list delete and update buttons events

elements.shopping.addEventListener("click", e => {
  //retrieve the id of the element that is clicked on by finding the closest element which contains the ID
  const id = e.target.closest(".shopping__item").dataset.itemid;

  //handle the delete event
  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    //delete it from the shopping list
    state.list.deleteItem(id);

    //delete from UI
    listView.deleteItem(id);

    //handle the count update
  } else if (e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

// restore liked recipes on page load using localstorage

window.addEventListener("load", () => {
  state.likes = new Likes();

  //restore likes
  state.likes.readStorage();

  //toggle like menu button, if there is more than > 0 set the like button to visible

  likesView.toggleLikeMenu(state.likes.getNumLikes());

  //render existing liked recipes in liked menu
  state.likes.likes.forEach(like => likesView.renderLike(like));
});

// hadling recipe button clicks

elements.recipe.addEventListener("click", e => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    // decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    // increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    //add ingredients to the shopping list
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    //call like controller
    controlLikes();
  }
});

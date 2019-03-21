// Global app controller

import Search from "./models/Search";
import * as searchView from "./views/searchView"; //import all function form searchView
import { elements, renderLoader, clearLoader } from "./views/index";

// global state of the app -- store of redux
/*
 - search object
 - current recipe object
 - shopping list object
 - liked recipes
*/
const state = {};

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

    //4. Search for recipes
    await state.search.getResults();

    //5. Render results on UI -- only to happen when we recieve the results from api, so await 4.

    clearLoader();
    searchView.renderResults(state.search.result); //result from Search Model
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault(); //prevent default from refershing
  controlSearch();
});

const search = new Search("meat");
search.getResults();

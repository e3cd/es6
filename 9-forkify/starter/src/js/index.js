// Global app controller

import axios from "axios";

async function getResults(query) {
  const apiKey = process.env.API_KEY;
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  try {
    const res = await axios.get(`${proxy}https://www.food2fork.com/api/search?key=${apiKey}&q=${query}
    `);
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error) {
    alert(error);
  }
}

getResults("dumplings");

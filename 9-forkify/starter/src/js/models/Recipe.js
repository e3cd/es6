import axios from "axios";
import { apiKey, proxy } from "./../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios.get(`${proxy}https://www.food2fork.com/api/get?key=${apiKey}&rId=${
        this.id
      }
          `);
      //save these data inside RECIPE object
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert("Something went wrong ,,I,,");
    }
  }

  //method for calculating cooking time, assume that for every three ingredients we need 15 min

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    //create two arrays, one which has the units as they appear in the data, second array with the units as we want them to be. Loop through unitsLong, if el matches with unitsLong[i] replace with unitsShort[i]

    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds"
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound"
    ];

    const newIngredients = this.ingredients.map(el => {
      //1. uniform units tbsp/tablespoon = same

      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]); //replace long with short
      });

      //2. remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      //3. parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2)); //return the index of the unit if the element is in the unitsShort array, -1 for

      let objIng;
      if (unitIndex > -1) {
        //There is a unit
        //ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") -> 4.5
        //ex 4 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" ")
        };
      } else if (parseInt(arrIng[0], 10)) {
        //There is no unit, but 1st element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" ")
        };
      } else if (unitIndex === -1) {
        //there is no unit
        objIng = {
          count: 1,
          unit: "",
          ingredient
        };
      }

      return objIng; // for each interation of map method we need return something which is saved into the current position of the new array
    });
    this.ingredients = newIngredients;
  }
}

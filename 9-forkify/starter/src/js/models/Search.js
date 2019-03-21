import axios from "axios";

//method to make api call
export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const apiKey = process.env.API_KEY_3;
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    try {
      const res = await axios.get(`${proxy}https://www.food2fork.com/api/search?key=${apiKey}&q=${
        this.query
      }
      `);
      this.result = res.data.recipes;
      //   console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}

export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    return like;
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    //implement localStorage -- each time the this.likes array changes we persist and store the data into localstorage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    //find the index of the element id which matches the passed in id
    const index = this.likes.findIndex(el => el.id === id);
    // [2, 4, 8].splice(1,2) -> will return [4. 8] and mutate the original array to [2], unlike slice which returns .slice(1,2) which returns [4] and orignal array [2, 4, 8]
    this.likes.splice(index, 1);

    //persist data in localStorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1; // if there is no element with matching id then it will return -1. Therefore test if its -1 and not liked --- will return true if the current index is a liked element
  }

  getNumLikes() {
    return this.likes.length;
  }

  //method for localstorage -- key and value pair which can only be strings, so convert this.likes array into a string

  persistData() {
    localStorage.setItem("likes", JSON.stringify(this.likes)); //use JSON.stringify() to convert array into string
  }

  //method to retrieve the data back from localStorage, when the page reloads and want to gain access to all our liked recipes

  readStorage() {
    //convert from string back to an array using JSON.parse
    const storage = JSON.parse(localStorage.getItem("likes"));
    //restore likes from the localStorage to the likes global object when the page reloads
    if (storage) this.likes = storage;
  }
}

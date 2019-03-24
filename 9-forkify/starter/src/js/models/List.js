import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  //method to add new items to lst

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }

  //method to delete item, pass in the id of an item as an argument, based on id we will delete from items array using splice

  deleteItem(id) {
    //find the index of the element id which matches the passed in id
    const index = this.items.findIndex(el => el.id === id);
    // [2, 4, 8].splice(1,2) -> will return [4. 8] and mutate the original array to [2], unlike slice which returns .slice(1,2) which returns [4] and orignal array [2, 4, 8]
    this.items.splice(index, 1);
  }

  //method to update the count of the recipe item, pass in newCount as the new item amount

  updateCount(id, newCount) {
    //return item
    this.items.find(el => el.id === id).count = newCount;
  }
}

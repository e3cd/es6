//create an object that contains all the elements that we need from our app

const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResList: document.querySelector(".results__list"),
  searchRes: document.querySelector(".results")
};

const elementStrings = {
  loader: "loader"
};

//reloader for resuability, pass in the parent class which is elements.searchRes and attach renderloader as child element of parent
const renderLoader = parent => {
  const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);

  //remove the loader by moving up to the parent element and use removeCHild
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};

module.exports = {
  elements,
  renderLoader,
  clearLoader,
  elementStrings
};

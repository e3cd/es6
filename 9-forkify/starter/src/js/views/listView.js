import { elements } from "./index";

//method to render and delete item from ui

const renderItem = item => {
  const markup = `
    <li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <input type="number" value="${item.count}" step="${
    item.count
  }" class="shopping__count-value">
                        <p>g</p>
                    </div>
                    <p class="shopping__description">Pasta</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
    
    `;
  elements.shopping.insertAdjacentHTML("beforeend", markup);
};

const deleteItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};

module.exports = {
  renderItem,
  deleteItem
};
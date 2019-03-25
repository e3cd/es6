import { elements } from "./index";
import { limitRecipeTitle } from "./searchView";

const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${iconString}`);
};

const toggleLikeMenu = numLikes => {
  //show menu or not
  elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

const renderLike = like => {
  const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;

  elements.likesList.insertAdjacentHTML("beforeend", markup);
};

const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`)
    .parentElement; //select all of the likes link with and delete the item using parentelement
  if (el) el.parentElement.removeChild(el);
};

module.exports = {
  toggleLikeBtn,
  toggleLikeMenu,
  renderLike,
  deleteLike
};

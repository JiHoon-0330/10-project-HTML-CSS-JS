const setFavoriteMeals = async () => {
  const storage = getMealsSessionStorage();
  let html = "";
  if (storage.length) {
    let cnt = 6;
    while (storage.length && cnt) {
      const id = storage.pop();
      const {
        data: { meals },
        error
      } = await getApi.idMeals(id);
      html += getHTML(meals[0], error, "fav");
      cnt--;
    }
  } else {
    document.querySelector(
      ".fav__loading"
    ).textContent = `Choose your favorite meal!`;
  }
  document.querySelector(".fav__loading").textContent = "";
  document.querySelector(".grid__fav").innerHTML = html;
};

const setRandomMeal = async () => {
  let html = "<span>Random Recipe</span>";
  const {
    data: { meals },
    error
  } = await getApi.randomMeals();
  html += getHTML(meals[0], error, "random");
  document.querySelector(".random__loading").textContent = "";
  document.querySelector(".recipe__info").innerHTML = html;
  const id = document.querySelector(".img").id;
  setHeart(id);
};

const init = () => {
  setFavoriteMeals();
  setRandomMeal();
};

init();

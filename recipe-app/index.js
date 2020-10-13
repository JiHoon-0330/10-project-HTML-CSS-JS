const setFavoriteMeals = async () => {
  let randomMeals = "<h2>Favorite Meals</h2><ul>";
  const meals = getMealsSessionStorage();
  const len = meals.length;
  const maxLen = len - 5;

  if (meals.length) {
    for (let i = len - 1; i >= maxLen && i >= 0; i--) {
      const response = await getIDMeals(meals[i]);
      const { idMeal, strMeal, strMealThumb } = response.meals[0];

      randomMeals += `
        <li>
          <a href="./recipe.html?id=${idMeal}">
            <img
              id=${idMeal}
              src=${strMealThumb}/preview
              onerror="this.src='${strMealThumb}'"
              alt="${strMealThumb}"
            />
          </a>
          <span title="${strMeal}">${strMeal}</span>
        </li>`;
    }

    document.querySelector(".favorite__meals").innerHTML =
      randomMeals + "</ul>";
  } else {
    document.querySelector(".loading__favorite").textContent =
      "좋아하는 음식을 저장해보세요!";
  }
};

const setRandomRecipe = async () => {
  let randomRecipe = "<span>Random Recipe</span>";
  const response = await getRandomMeals();
  const { idMeal, strMeal, strMealThumb } = response.meals[0];

  randomRecipe += `
    <a href="./recipe.html?id=${idMeal}">
      <img
        id=${idMeal}
        src=${strMealThumb}
        alt=""
      />
    </a>
    <div class="random">
      <span title="${strMeal}">${strMeal}</span>
      <span><i class="fas fa-heart"></i></span>
    </div>`;

  document.querySelector(".recipe__info").innerHTML = randomRecipe;
  setHeart(idMeal);
};

const init = () => {
  setFavoriteMeals();
  setRandomRecipe();
};

init();

const setFavoriteMeals = async () => {
  const meals = getMealsSessionStorage();
  const len = meals.length;
  const maxLen = len - 6;

  let html = "";

  if (meals.length) {
    for (let i = len - 1; i >= maxLen && i >= 0; i--) {
      const response = await getIDMeals(meals[i]);
      const { idMeal, strMeal, strMealThumb } = response.meals[0];
      html += `
      <a href="./recipe.html?id=${idMeal}">
      <span class="img" style="background-image: url('${strMealThumb}')"></span>
      <span class="title" title="${strMeal}">${strMeal}</span>
      </a>
      `;
    }

    document.querySelector(".grid > div").innerHTML = html;
  } else {
    document.querySelector(".loading__favorite").textContent =
      "Choose your favorite meal!";
  }
};

const setRandomRecipe = async () => {
  let randomRecipe = "<span>Random Recipe</span>";
  const response = await getRandomMeals();
  const { idMeal, strMeal, strMealThumb } = response.meals[0];

  randomRecipe += `
    <a href="./recipe.html?id=${idMeal}">
    <span class="img" style="background-image: url('${strMealThumb}')"></span>
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

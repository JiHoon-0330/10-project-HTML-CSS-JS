const getFirstLetterMeals = async letter => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  ).then(res => res.json());
  console.log(response);
  return response;
};

const getRandomMeals = async () => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  ).then(res => res.json());
  return response;
};

const getIDMeals = async id => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  ).then(res => res.json());
  return response;
};

const setFavoriteMeals = async () => {
  let randomMeals = "<h2>Favorite Meals</h2><ul>";
  let cnt = 0;
  let maxCnt = 5;
  for (let keys in sessionStorage) {
    if (keys === "length" || cnt > maxCnt) {
      break;
    }
    if (sessionStorage.getItem(keys) === "meal") {
      const response = await getIDMeals(keys);
      randomMeals += `
      <li>
        <img
          src=${response.meals[0].strMealThumb}
          alt=""
        />
        <span title="${response.meals[0].strMeal}">${response.meals[0].strMeal}</span>
      </li>`;
    }
    cnt++;
  }

  document.querySelector(".favorite__meals").innerHTML = randomMeals + "</ul>";
};

const setRandomRecipe = async () => {
  let randomRecipe = "<span>Random Recipe</span>";
  const response = await getRandomMeals();
  randomRecipe += `
  <img
    src=${response.meals[0].strMealThumb}
    alt=""
  />
  <div class="random">
    <span title="${response.meals[0].strMeal}">${response.meals[0].strMeal}</span>
    <span><i class="fas fa-heart"></i></span>
  </div>`;

  document.querySelector(".recipe__info").innerHTML = randomRecipe;

  const heart = document.querySelector(".fa-heart");
  heart.addEventListener("click", () => {
    if (sessionStorage.getItem(response.meals[0].idMeal)) {
      sessionStorage.removeItem(response.meals[0].idMeal);
    } else {
      sessionStorage.setItem(response.meals[0].idMeal, "meal");
    }
    heart.classList.toggle("red");
  });
};

const init = () => {
  setFavoriteMeals();
  setRandomRecipe();
};

init();

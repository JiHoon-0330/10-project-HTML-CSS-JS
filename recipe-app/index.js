const setFavoriteMeals = async () => {
  let randomMeals = "<h2>Favorite Meals</h2><ul>";
  const meals = getMealsSessionStorage();

  for (let i = meals.length - 1; i >= meals.length - 5; i--) {
    const response = await getIDMeals(meals[i]);
    const { idMeal, strMeal, strMealThumb } = response.meals[0];

    randomMeals += `
      <li>
        <img
          id=${idMeal}
          src=${strMealThumb}
          alt=""
        />
        <span title="${strMeal}">${strMeal}</span>
      </li>`;
  }

  document.querySelector(".favorite__meals").innerHTML = randomMeals + "</ul>";
  setImg(".favorite__meals img");
};

const setRandomRecipe = async () => {
  let randomRecipe = "<span>Random Recipe</span>";
  const response = await getRandomMeals();
  const { idMeal, strMeal, strMealThumb } = response.meals[0];

  randomRecipe += `
    <img
      id=${idMeal}
      src=${strMealThumb}
      alt=""
    />
    <div class="random">
      <span title="${strMeal}">${strMeal}</span>
      <span><i class="fas fa-heart"></i></span>
    </div>`;

  document.querySelector(".recipe__info").innerHTML = randomRecipe;
  setHeart(idMeal);
  setImg(".recipe__info img");
};

const removeMeal = (meals, id) => {
  meals = meals.filter(meal => meal !== id);
  sessionStorage.setItem("meals", JSON.stringify([...meals]));
};

const saveMeal = (meals, id) => {
  sessionStorage.setItem("meals", JSON.stringify([...meals, id]));
};

const setHeart = id => {
  const heart = document.querySelector(".fa-heart");
  let meals = getMealsSessionStorage();

  if (meals.includes(id)) {
    heart.classList.add("red");
  }

  heart.addEventListener("click", () => {
    meals = getMealsSessionStorage();
    if (meals.includes(id)) {
      removeMeal(meals, id);
    } else {
      saveMeal(meals, id);
    }
    heart.classList.toggle("red");
  });
};

const setImg = target => {
  const img = document.querySelectorAll(target);
  img.forEach(img => {
    img.addEventListener("click", e => {
      console.log(e.target.id);

      document.querySelector(".popup__info").innerHTML = `hello ${e.target.id}`;
      document.querySelector(".popup").classList.toggle("hidden");
    });
  });
};

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".popup").classList.toggle("hidden");
});

const init = () => {
  setFavoriteMeals();
  setRandomRecipe();
};

init();

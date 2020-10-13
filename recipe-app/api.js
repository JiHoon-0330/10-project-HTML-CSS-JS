// getAPI
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

const getNameMeals = async word => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
  ).then(res => res.json());
  return response;
};

const getAreaMeals = async word => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${word}`
  ).then(res => res.json());
  return response;
};

const getCategoryMeals = async word => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${word}`
  ).then(res => res.json());
  return response;
};

const getCategory = async meals => {
  const response = await getIDMeals(meals[0].idMeal);
  return response.meals[0].strCategory;
};

// favorit
const getMealsSessionStorage = () => {
  const meals = sessionStorage.getItem("meals");
  return meals ? JSON.parse(meals) : [];
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

// search
const searchWord = word => {
  location.href = `/recipe-app/search.html?search=${word}`;
};

document.querySelector(".fa-search").addEventListener("click", () => {
  searchWord(document.querySelector("#search").value);
});

document.querySelector("#search").addEventListener("keyup", () => {
  if (window.event.keyCode === 13) {
    document.querySelector(".fa-search").click();
  }
});

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
      html += getHTML(meals[0], error, "favorite");
      cnt--;
    }
  } else {
    document.querySelector(
      ".favorite__loading"
    ).textContent = `Choose your favorite meal!`;
  }
  document.querySelector(".grid__favorite").innerHTML = html;
};

const setRandomMeal = async () => {
  let html = "<span>Random Recipe</span>";
  const {
    data: { meals },
    error
  } = await getApi.randomMeals();
  html += getHTML(meals[0], error, "random");

  document.querySelector(".recipe__info").innerHTML = html;
  const id = document.querySelector(".img").id;
  setHeart(id);
};

const init = () => {
  setFavoriteMeals();
  setRandomMeal();
};

init();

const printResult = meals => {
  let cnt = 6;
  let meal = null;
  let li = "";

  if (meals.length === 1) {
    li = `<p>No results</p>`;
  } else {
    while (cnt && meals.length) {
      if (meals.length > cnt + 1) {
        const random = Math.random();
        const i = parseInt(random * meals.length);
        meal = meals[i];
      } else {
        meal = meals.pop();
      }
      const { idMeal, strMeal, strMealThumb } = meal;
      if (!check.includes(strMeal)) {
        check.push(strMeal);
        li += `
          <a href="./recipe.html?id=${idMeal}">
            <span class="img" style="background-image: url('${strMealThumb}')"></span>
            <span class="title" title="${strMeal}">${strMeal}</span>
            </a>
        `;
        cnt--;
      }
    }
  }
  document.querySelector(".grid__category").innerHTML = li;
};

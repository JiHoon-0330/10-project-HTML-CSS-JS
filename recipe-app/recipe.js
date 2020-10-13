const url = location.href;
const param = url.split("?")[1];
const id = param.split("=")[1];

const getResult = async () => {
  const idMeals = await getIDMeals(id);
  setMealInfo(idMeals.meals[0]);
  const category = await getCategory(idMeals.meals);
  const categoryMeals = await getCategoryMeals(category);
  setRecommend(categoryMeals.meals, idMeals.meals[0].strMeal);
};

const setMealInfo = meal => {
  const {
    idMeal,
    strMeal,
    strMealThumb,
    strArea,
    strCategory,
    strInstructions
  } = meal;

  document.querySelector(".title").textContent = strMeal;
  document.querySelector(".info").textContent = `#${strArea} #${strCategory}`;

  document.querySelector(".recipe__instructions").textContent = strInstructions;
  document.querySelector(
    ".recipe__info > span"
  ).innerHTML = `<span><i class="fas fa-heart"></i></span>`;

  document.querySelector(
    ".recipe__header"
  ).innerHTML = `<img src="${strMealThumb}" />`;

  let li = "<ul>";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      li += `<li>${meal[`strIngredient${i}`]}  ${meal[`strMeasure${i}`]}</li>`;
    } else {
      break;
    }
  }
  document.querySelector(".recipe__header").innerHTML += `${li}</ul>`;

  setHeart(idMeal);
};

const setRecommend = (meals, name) => {
  console.log(meals.length);
  let li = "";
  const check = [name];
  if (meals) {
    let cnt = 5;
    if (meals.length > cnt + 1) {
      li = "<ul>";
      while (cnt) {
        const random = Math.random();
        const i = parseInt(random * meals.length);
        const { idMeal, strMeal, strMealThumb } = meals[i];
        if (!check.includes(strMeal)) {
          check.push(strMeal);
          cnt--;
          li += `
          <li>
            <a href="/recipe-app/recipe.html?id=${idMeal}">
              <img src="${strMealThumb}/preview" onerror="this.src='${strMealThumb}'" alt="" />
            </a>
            <span>${strMeal}</span>
          </li>`;
        }
        li += "</ul>";
      }
    } else {
      for (let i = 0; i < meals.length; i++) {
        const { idMeal, strMeal, strMealThumb } = meals[i];
        if (!check.includes(strMeal)) {
          li += `
          <li>
            <a href="/recipe-app/recipe.html?id=${idMeal}">
              <img src="${strMealThumb}/preview" onerror="this.src='${strMealThumb}'" alt="" />
            </a>
            <span>${strMeal}</span>
          </li>`;
        }
        li += "</ul>";
      }
    }
  }
  document.querySelector(".recommend").innerHTML = li;
};

const init = () => {
  getResult();
};

init();

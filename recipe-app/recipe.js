const url = location.href;
const param = url.split("?")[1];
const id = param.split("=")[1];
const check = [];

const getResult = async () => {
  const idMeals = await getIDMeals(id);
  setMealInfo(idMeals.meals[0]);

  const category = await getCategory(idMeals.meals);
  const categoryMeals = await getCategoryMeals(category);
  printResult(categoryMeals.meals);
};

const setMealInfo = meal => {
  let li = "<ul>";
  const {
    idMeal,
    strMeal,
    strMealThumb,
    strArea,
    strCategory,
    strInstructions
  } = meal;

  check.push(strMeal);

  document.querySelector(".title").textContent = strMeal;
  document.querySelector(".info").textContent = `#${strArea} #${strCategory}`;

  document.querySelector(".recipe__instructions").textContent = strInstructions;
  document.querySelector(
    ".recipe__info > span"
  ).innerHTML = `<span><i class="fas fa-heart"></i></span>`;

  document.querySelector(
    ".recipe__header"
  ).innerHTML = `<img src="${strMealThumb}" />`;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] === "") {
      break;
    } else {
      li += `<li>${meal[`strIngredient${i}`]}  ${meal[`strMeasure${i}`]}</li>`;
    }
  }

  document.querySelector(".recipe__header").innerHTML += `${li}</ul>`;
  setHeart(idMeal);
};

const printResult = meals => {
  let cnt = 5;
  let meal = null;
  let li = "";

  if (meals.length === 1) {
    li = `<p>No results</p>`;
  } else {
    li = "<ul>";
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
        <li>
          <a href="./recipe.html?id=${idMeal}">
            <img src="${strMealThumb}/preview" onerror="this.src='${strMealThumb}'" alt="" />
          </a>
          <span title="${strMeal}">${strMeal}</span>
        </li>`;
        cnt--;
      }
    }
    li += "</ul>";
  }
  document.querySelector(".recommend").innerHTML = li;
};

const init = () => {
  getResult();
};

init();

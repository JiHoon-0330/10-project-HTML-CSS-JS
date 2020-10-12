const url = location.href;
const param = url.split("?")[1];
const id = param.split("=")[1];

const getMealInfo = async () => {
  const response = await getIDMeals(id);
  const meal = response.meals[0];
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

  console.log(meal);
};

const init = () => {
  getMealInfo();
};

init();

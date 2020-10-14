const printResult = meal => {
  const { idMeal, strMeal, strArea, strCategory, strMealThumb } = meal;
  let html = `
  <a href="./recipe.html?id=${idMeal}">
      <span class="img" style="background-image: url('${strMealThumb}')"></span>
      <span class="title" title="${strMeal}">${strMeal}</span>
      </a>
  `;
  return html;
};

const getResult = async () => {
  let html = "";
  const favorite = getMealsSessionStorage();
  if (!favorite.length) {
    html = "No Result";
  } else {
    for (let i = 0; i < favorite.length; i++) {
      const meal = await getIDMeals(favorite[i]);
      html += printResult(meal.meals[0]);
    }
  }

  document.querySelector(".grid__favorite").innerHTML = html;
};

const init = () => {
  getResult();
};

init();

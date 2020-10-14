const url = location.href;
const param = url.split("?")[1];
const id = param.split("=")[1];
const check = [];

const setRecipe = async () => {
  const {
    data: { meals },
    error
  } = await getApi.idMeals(id);

  if (error) {
    document.querySelector(
      ".recipe__loading"
    ).textContent = `failed to load...`;
    document.querySelector(".category__loading").textContent = `No result`;
    return;
  }

  if (!meals) {
    document.querySelector(
      ".recipe__loading"
    ).textContent = `failed to load...`;
    document.querySelector(".category__loading").textContent = `No result`;
    return;
  } else {
    let html = "";
    let ul = "<ul>";
    const meal = meals[0];
    const {
      idMeal,
      strMeal,
      strMealThumb,
      strArea,
      strCategory,
      strInstructions
    } = meal;
    check.push(strMeal);
    setSameCategory(strCategory);

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`] === "") {
        break;
      } else {
        ul += `<li>${meal[`strIngredient${i}`]}  ${
          meal[`strMeasure${i}`]
        }</li>`;
      }
    }
    ul += "</ul>";
    html += `
    <div class="recipe__inner">
      <div class="recipe__header">
        <span class="img" id="${idMeal}" style="background-image: url('${strMealThumb}')"></span>
        ${ul}
      </div>
      <div class="recipe__body">
        <div class="recipe__info">
          <span class="title" title="${strMeal}">${strMeal}</span>
          <span class="tag">#${strArea} #${strCategory}</span>
        </div>
        <span><i class="fas fa-heart"></i></span>
      </div>
      <pre class="instructions">${strInstructions}<pre>
    </div>
      `;

    document.querySelector(".recipe").innerHTML = html;
    const id = document.querySelector(".img").id;
    setHeart(id);
  }
};

const setSameCategory = async category => {
  const response = await getApi.categoryMeals(category);
  let html = "";
  let cnt = 6;
  const {
    error,
    data: { meals }
  } = response;
  const newMeals = meals.slice();

  if (newMeals.length < 2) {
    document.querySelector(".category__loading").textContent = `No result`;
  } else {
    while (cnt && newMeals.length) {
      if (newMeals.length > cnt + 1) {
        const random = Math.random();
        const i = parseInt(random * newMeals.length);
        meal = meals[i];
      } else {
        meal = meals.pop();
      }
      html += getHTML(meal, error, "category");
      cnt--;
    }
  }
  document.querySelector(".grid__category").innerHTML = html;
};

const init = () => {
  setRecipe();
};

init();

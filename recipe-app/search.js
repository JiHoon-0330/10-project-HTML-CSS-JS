const url = location.href;
const params = url.split("?")[1];
const search = params.split("=")[1];

const getResult = async () => {
  const name = await getNameMeals(search);
  setNameResult(name.meals);
  const category = await getCategoryMeals(search);
  setCategoryResult(category.meals);
  const area = await getAreaMeals(search);
  setAreaResult(area.meals);
};

const setNameResult = meals => {
  console.log(`name:`, meals);
  if (meals) {
    let li = "";
    for (let i = 0; i < meals.length; i++) {
      const { idMeal, strMeal, strArea, strCategory, strMealThumb } = meals[i];
      li += `
      <li>
        <a href="/recipe-app/recipe.html?id=${idMeal}"><img src="${strMealThumb}" alt="" /></a>
        <span>${strMeal}</span>
        <span class="tag">#${strArea} #${strCategory}</span>
      </li>`;
    }
    document.querySelector(".name > .result > ul").innerHTML = li;
  } else {
  }
};
const setCategoryResult = meals => {
  console.log(`cate:`, meals);
  if (meals) {
    let li = "";
    for (let i = 0; i < meals.length; i++) {
      const { idMeal, strMeal, strArea, strCategory, strMealThumb } = meals[i];
      li += `
      <li>
        <a href="/recipe-app/recipe.html?id=${idMeal}"><img src="${strMealThumb}" alt="" /></a>
        <span>${strMeal}</span>
      </li>`;
    }
    document.querySelector(".category > .result > ul").innerHTML = li;
  } else {
  }
};
const setAreaResult = meals => {
  console.log(`area:`, meals);
  if (meals) {
    let li = "";
    for (let i = 0; i < meals.length; i++) {
      const { idMeal, strMeal, strArea, strCategory, strMealThumb } = meals[i];
      li += `
      <li>
        <a href="/recipe-app/recipe.html?id=${idMeal}"><img src="${strMealThumb}" alt="" /></a>
        <span>${strMeal}</span>
      </li>`;
    }
    document.querySelector(".area > .result > ul").innerHTML = li;
  } else {
  }
};

const init = () => {
  getResult();
};

init();

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
  let li = "";
  if (meals) {
    li = "<ul>";
    for (let i = 0; i < meals.length; i++) {
      const { idMeal, strMeal, strArea, strCategory, strMealThumb } = meals[i];
      li += `
      <li>
        <a href="/recipe-app/recipe.html?id=${idMeal}"><img src="${strMealThumb}/preview" onerror="this.src='${strMealThumb}'" alt="" /></a>
        <span>${strMeal}</span>
        <span class="tag">#${strArea} #${strCategory}</span>
      </li>`;
    }
    li += "</ul>";
  } else {
    li = `<p>검색결과가 없습니다.</p>`;
  }
  document.querySelector(".name > .result").innerHTML = li;
};
const setCategoryResult = meals => {
  console.log(`cate:`, meals);
  let li = "";
  if (meals) {
    li = "<ul>";
    for (let i = 0; i < meals.length; i++) {
      const { idMeal, strMeal, strMealThumb } = meals[i];
      li += `
      <li>
        <a href="/recipe-app/recipe.html?id=${idMeal}"><img src="${strMealThumb}/preview" onerror="this.src='${strMealThumb}'" alt="" /></a>
        <span>${strMeal}</span>
      </li>`;
    }
    li += "</ul>";
  } else {
    li = `<p>검색결과가 없습니다.</p>`;
  }
  document.querySelector(".category > .result").innerHTML = li;
};
const setAreaResult = meals => {
  console.log(`area:`, meals);
  let li = "";
  if (meals) {
    li = "<ul>";
    for (let i = 0; i < meals.length; i++) {
      const { idMeal, strMeal, strMealThumb } = meals[i];
      li += `
      <li>
        <a href="/recipe-app/recipe.html?id=${idMeal}"><img src="${strMealThumb}/preview" onerror="this.src='${strMealThumb}'" alt="" /></a>
        <span>${strMeal}</span>
      </li>`;
    }
    li += "</ul>";
  } else {
    li = `<p>검색결과가 없습니다.</p>`;
  }
  document.querySelector(".area > .result").innerHTML = li;
};

const init = () => {
  getResult();
};

init();

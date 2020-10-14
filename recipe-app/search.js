const url = location.href;
const params = url.split("?")[1];
const search = params.split("=")[1];

const printResult = (tag, meals) => {
  console.log(``, tag);
  let li = "";
  if (meals) {
    for (let i = 0; i < meals.length; i++) {
      const { idMeal, strMeal, strArea, strCategory, strMealThumb } = meals[i];
      console.log(strArea);
      li += `
      <a href="./recipe.html?id=${idMeal}">
      <span class="img" style="background-image: url('${strMealThumb}/preview'), url('${strMealThumb}')"></span>
      <span class="title" title="${strMeal}">${strMeal}</span>
      </a>
      `;
    }
  } else {
    li = `<p>No results</p>`;
  }
  document.querySelector(`.grid__${tag}`).innerHTML = li;
};

const setNameResult = meals => {
  printResult("title", meals);
};

const setCategoryResult = meals => {
  printResult("category", meals);
};

const setAreaResult = meals => {
  printResult("area", meals);
};

const getResult = async () => {
  const name = await getNameMeals(search);
  setNameResult(name.meals);

  const category = await getCategoryMeals(search);
  setCategoryResult(category.meals);

  const area = await getAreaMeals(search);
  setAreaResult(area.meals);
};

const init = () => {
  getResult();
};

init();

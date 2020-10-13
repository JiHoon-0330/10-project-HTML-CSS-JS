const url = location.href;
const params = url.split("?")[1];
const search = params.split("=")[1];

const printResult = (tag, meals) => {
  console.log(``, tag);
  let li = "";
  if (meals) {
    li = "<ul>";
    for (let i = 0; i < meals.length; i++) {
      const { idMeal, strMeal, strArea, strCategory, strMealThumb } = meals[i];
      console.log(strArea);
      li += `
      <li>
        <a href="./recipe.html?id=${idMeal}">
          <img src="${strMealThumb}/preview" onerror="this.src='${strMealThumb}'" alt="" />
        </a>
        <span title="${strMeal}">${strMeal}</span>
        <span class="tag">
          ${strArea === undefined ? `` : `#${strArea} #${strCategory}`}
        </span>
        </li>`;
    }
    li += "</ul>";
  } else {
    li = `<p>No results</p>`;
  }
  document.querySelector(`.${tag} > .result`).innerHTML = li;
};

const setNameResult = meals => {
  printResult("name", meals);
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

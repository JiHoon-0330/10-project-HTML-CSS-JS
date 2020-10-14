const url = location.href;
const params = url.split("?")[1];
const search = params.split("=")[1];

const printResult = (tag, meals) => {
  console.log(``, tag);
  let li = "";
  if (meals) {
    for (let i = 0; i < meals.length; i++) {
      const { idMeal, strMeal, strMealThumb } = meals[i];
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

const setResult = (response, tag) => {
  let html = "";
  const {
    data: { meals },
    error
  } = response;
  if (!meals) {
    document.querySelector(`.${tag}__loading`).textContent = "No result";
  } else {
    for (let i = 0; i < meals.length; i++) {
      html += getHTML(meals[i], error, tag);
    }
    console.log(document.querySelector(`.grid__${tag}`));
    document.querySelector(`.grid__${tag}`).innerHTML = html;
  }
};

const setNameResult = async () => {
  const response = await getApi.nameMeals(search);
  setResult(response, "name");
};
const setCategoryResult = async () => {
  const response = await getApi.categoryMeals(search);
  setResult(response, "category");
};
const setAreaResult = async () => {
  const response = await getApi.areaMeals(search);
  setResult(response, "area");
};
const init = () => {
  setNameResult();
  setCategoryResult();
  setAreaResult();
};

init();

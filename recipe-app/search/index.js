const url = location.href;
const params = url.split("?")[1];
const search = params.split("=")[1];

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
    document.querySelector(`.${tag}__loading`).textContent = "";
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

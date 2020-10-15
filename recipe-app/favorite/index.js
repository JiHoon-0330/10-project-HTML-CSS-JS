const setFavorite = async () => {
  let html = "";
  const storage = getMealsSessionStorage();
  if (!storage.length) {
    document.querySelector(".favorite__loading").textContent =
      "Choose your favorite meal!";
  } else {
    while (storage.length) {
      const {
        data: { meals },
        error
      } = await getApi.idMeals(storage.pop());

      html += getHTML(meals[0], error, "favorite");
    }
    document.querySelector(".favorite__loading").textContent = "";
    document.querySelector(".grid__favorite").innerHTML = html;
  }
};

const init = () => {
  setFavorite();
};

init();

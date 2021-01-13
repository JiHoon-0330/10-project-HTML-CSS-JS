// getAPI

const getApi = {
  idMeals: async id => await api(`lookup.php?i=${id}`),
  randomMeals: async () => await api(`random.php`),
  nameMeals: async word => await api(`search.php?s=${word}`),
  categoryMeals: async word => await api(`filter.php?c=${word}`),
  areaMeals: async word => await api(`filter.php?a=${word}`)
};

const api = async url => {
  const baseURL = `https://www.themealdb.com/api/json/v1/1/`;
  const URL = baseURL + url;
  const state = {
    data: null,
    error: false
  };

  state.data = await fetch(URL)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        state.error = true;
        console.log(`res.ok err`);
      }
    })
    .catch(err => {
      state.error = true;
      console.log(err);
    });

  return state;
};

// favorit
const getMealsSessionStorage = () => {
  const meals = sessionStorage.getItem("meals");
  return meals ? JSON.parse(meals) : [];
};

const removeMeal = (meals, id) => {
  meals = meals.filter(meal => meal !== id);
  sessionStorage.setItem("meals", JSON.stringify([...meals]));
};

const saveMeal = (meals, id) => {
  sessionStorage.setItem("meals", JSON.stringify([...meals, id]));
};

document.querySelector("body").addEventListener("click", e => {
  const target = e.target;
  const dataset = target.dataset;
  const type = dataset.type;
  const id = dataset.id;
  if (type !== "heart") {
    return;
  } else {
    let meals = getMealsSessionStorage();
    if (meals.includes(id)) {
      target.classList.add("red");
    }

    meals = getMealsSessionStorage();
    if (meals.includes(id)) {
      removeMeal(meals, id);
      target.classList.remove("active__red");
    } else {
      saveMeal(meals, id);
      target.classList.add("active__red");
    }
    target.classList.toggle("red");
  }
});

// search
const searchWord = word => {
  location.href = `/recipe-app/search/index.html?search=${word}`;
};

document.querySelector(".fa-search").addEventListener("click", () => {
  searchWord(document.querySelector("#search").value);
});

document.querySelector("#search").addEventListener("keyup", () => {
  if (window.event.keyCode === 13) {
    document.querySelector(".fa-search").click();
  }
});

// printHTML
const getHTML = (meal, error, tag) => {
  let html = "";
  const load = `${tag}__loading`;
  let text = document.querySelector(`.${load}`);

  if (error) {
    text.textContent = `failed to loda...`;
    return;
  }
  if (meal) {
    const { idMeal, strMeal, strMealThumb } = meal;
    if (tag === "random") {
      html += `
      <a href="./recipe/?id=${idMeal}">
      <span class="img" id="${idMeal}" style="background-image: url('${strMealThumb}')"></span>
      </a>
      <div class="random">
      <span title="${strMeal}">${strMeal}</span>
      <span><i class="fas fa-heart" data-type="heart" data-id="${idMeal}"></i></span>
      </div>`;
    } else {
      html += `
      <a href="${
        tag === "fav"
          ? `./recipe/index.html?id=${idMeal}`
          : `../recipe/index.html?id=${idMeal}`
      }" >
      <span class="img" style="background-image: url('${strMealThumb}')"></span>
      <span class="title" title="${strMeal}">${strMeal}</span>
      </a>
      `;
    }
    return html;
  } else {
    text.textContent = `failed to load...`;
    return;
  }
};

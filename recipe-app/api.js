// getAPI
const baseURL = `https://www.themealdb.com/api/json/v1/1`;
const getApi = {
  idMeals: async id => await api(`${baseURL}/lookup.php?i=${id}`),
  randomMeals: async () => await api(`${baseURL}/random.php`),
  nameMeals: async word => await api(`${baseURL}/search.php?s=${word}`),
  categoryMeals: async word => await api(`${baseURL}/filter.php?c=${word}`),
  areaMeals: async word => await api(`${baseURL}/filter.php?a=${word}`)
};

const api = async url => {
  const state = {
    data: null,
    error: false
  };
  state.data = await fetch(url)
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

const setHeart = id => {
  const heart = document.querySelector(".fa-heart");
  let meals = getMealsSessionStorage();

  if (meals.includes(id)) {
    heart.classList.add("red");
  }

  heart.addEventListener("click", () => {
    meals = getMealsSessionStorage();
    if (meals.includes(id)) {
      removeMeal(meals, id);
    } else {
      saveMeal(meals, id);
    }
    heart.classList.toggle("red");
  });
};

// search
const searchWord = word => {
  location.href = `./search.html?search=${word}`;
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
    text.textContent !== "" && (text.textContent = ``);
    const { idMeal, strMeal, strMealThumb } = meal;
    if (tag === "random") {
      html += `
      <a href="./recipe.html?id=${idMeal}">
      <span class="img" id="${idMeal}" style="background-image: url('${strMealThumb}')"></span>
      </a>
      <div class="random">
      <span title="${strMeal}">${strMeal}</span>
      <span><i class="fas fa-heart"></i></span>
      </div>`;
    } else {
      html += `
      <a href="./recipe.html?id=${idMeal}">
      <span class="img" style="background-image: url('${strMealThumb}')"></span>
      <span class="title" title="${strMeal}">${strMeal}</span>
      </a>
      `;
    }
  } else {
    text.textContent = `failed to load...`;
    return;
  }
  return html;
};

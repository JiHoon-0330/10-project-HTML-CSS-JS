const input = document.querySelector(".search-input");
let loading = false;
let err = false;
let menu = null;
let id = null;
let pageNum = 1;
const currentURL = location.href;
const params = currentURL.split("?")[1];
if (!params) {
  location.href = `${currentURL}?menu=movie`;
}
const param = params.split("&");
param.map(param => {
  const currentParam = param.split("=");
  switch (currentParam[0]) {
    case "menu":
      menu = currentParam[1];
      break;
    default:
      id = currentParam[1];
      break;
  }
});

const imgURL = "https://image.tmdb.org/t/p/";
const apiKey = "api_key=0eeaa62198c78b27a1a864f00b6de917";
const lang = "language=en-US";
const parameter = `?${apiKey}&${lang}`;

const getApi = {
  popular: async (menu, num = 1) =>
    await api(`${menu}/popular${parameter}`, num),
  detail: async (menu, id, num = 1) =>
    await api(`${menu}/${id}${parameter}`, num),
  search: async (menu, word, num) =>
    await api(`search/${menu}${parameter}&query=${word}`, num)
};

const api = async (url, num = 0) => {
  const page = `&page=${num}`;
  const baseURL = "https://api.themoviedb.org/3/";
  const URL = `${baseURL}${url}${num === 0 ? "" : page}`;
  console.log(URL);
  const state = {
    data: null,
    error: "Failed to load results"
  };

  state.data = await fetch(URL)
    .then(res => {
      if (res.ok) {
        state.error = false;
        return res.json();
      } else {
        console.log(`res error`);
      }
    })
    .catch(error => {
      console.log(error);
    });

  return state;
};

// search

input.addEventListener("input", e => {
  if (document.querySelector(".container")) {
    document.querySelector(".container").innerHTML = "";
  }
  const search = e.target.value;
  pageNum = 1;
  getSearchMovie(search, pageNum);
});

input.addEventListener("keyup", () => {
  if (window.event.keyCode === 13) {
    getSearchMovie(input.value);
  }
});
// print

const getMovieByID = async id => {
  const response = await getApi.detail(menu, id);
  printDetail(response);
};

const setRemoveDetail = () => {
  document.querySelector(".fa-times").addEventListener("click", () => {
    if (!document.querySelector("section").classList.contains("hidden")) {
      document.querySelector("section").classList.add("hidden");
    }
    if (document.querySelector("main").classList.contains("detail-main")) {
      document.querySelector("main").classList.remove("detail-main");
    }
  });
};

const setClickPoster = () => {
  document.querySelectorAll(".img").forEach(img => {
    img.addEventListener("click", e => {
      const posterID = e.target.id;
      getMovieByID(posterID);
      if (!document.querySelector("main").classList.contains("detail-main")) {
        document.querySelector("main").classList.add("detail-main");
      }
      if (document.querySelector("section").classList.contains("hidden")) {
        document.querySelector("section").classList.remove("hidden");
      }
    });
  });
};

const setSection = () => {
  document.querySelector("main").innerHTML += `
  <div>
    <div class="container"></div>
  </div>
  `;
};

const printList = response => {
  loading = true;
  const { data, error } = response;
  if (error) {
    document.querySelector(
      "main"
    ).innerHTML = `<p class="error-message">${error}</p>`;
    loading = false;
    err = true;
    return;
  }
  const { results, page } = data;
  if (page === 1) {
    setSection();
  }
  const container = document.querySelector(".container");
  let html = "";
  if (!results.length) {
    document.querySelector(
      "main"
    ).innerHTML = `<p class="error-message">No results were found for '${input.value}'</p>`;
    loading = false;
  }
  results.map(result => {
    const { original_title, original_name, poster_path, id } = result;

    html += `
      <div>
        <sapn id=${id} class="img" style="background-image:url(${imgURL}w500${poster_path}), url(./img/empty.png), url(../img/empty.png)"></sapn>
        <span class="title hidden">${original_title || original_name}</span>
      </div>
    `;
  });

  container.innerHTML += html;
  loading = false;
  setClickPoster();
};

const printDetail = response => {
  loading = true;
  const { data, error } = response;

  if (error) {
    document.querySelector(
      "main"
    ).innerHTML = `<p class="error-message">${error}</p>`;
    loading = false;
    err = true;
    return;
  }
  const {
    adult,
    backdrop_path,
    genres,
    original_title,
    original_name,
    overview,
    poster_path,
    release_date,
    first_air_date,
    runtime,
    seasons
  } = data;
  let html = "";
  let infoArr = [];
  let info = "";
  console.log(genres);
  let episode = 0;
  if (seasons) {
    seasons.map(season => {
      episode += season.episode_count;
    });
  }

  genres.length ? infoArr.push([genres.map(gen => gen.name)]) : "";
  release_date ? infoArr.push(release_date) : "";
  first_air_date ? infoArr.push(first_air_date) : "";
  runtime ? infoArr.push(`${runtime} minute`) : "";
  episode ? infoArr.push(`${episode} episode`) : "";
  adult ? infoArr.push("18+") : "";

  infoArr.forEach((value, index) => {
    console.log(value);
    info += index < infoArr.length - 1 ? `${value} / ` : value;
  });

  html += `
    <span class="remove-detail"><i class="fas fa-times"></i></span>
    <div class="backdrop-img" style="background-image: url(${imgURL}original${backdrop_path})" ></div>
    <div class="detail">
    <span class="poster" style="background-image:url(${imgURL}w500${poster_path}), url(./img/empty.png), url(../img/empty.png)"></span>
    <div class="detail-info">
      <h2 class="title">${
        original_title || original_name || "Title cannot be loaded"
      }</h2>
      <p class="info">${info || "Info cannot be loaded"}</p>
      <span class="overview">${overview || "Overview cannot be loaded"}</span>
    </div>
  </div>
  `;

  document.querySelector("section").innerHTML = html;
  loading = false;
  setRemoveDetail();
};

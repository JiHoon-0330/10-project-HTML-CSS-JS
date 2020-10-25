const imgURL = "https://image.tmdb.org/t/p/";
const apiKey = "api_key=0eeaa62198c78b27a1a864f00b6de917";
const lang = "language=en-US";
const parameter = `?${apiKey}&${lang}`;

const getApi = {
  popular: async (menu, num = 1) =>
    await api(`${menu}/popular${parameter}`, num),
  detail: async (menu, id, num = 1) =>
    await api(`${menu}/${id}${parameter}`, num),
  search: async (menu, word) =>
    await api(`search/${menu}${parameter}&query=${word}`)
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

document.querySelector(".search-input").addEventListener("input", e => {
  getSearchMovie(e.target.value);
});

// print

const printList = response => {
  const { data, error } = response;
  if (error) {
    container.textContent = error;
    return;
  }
  document.querySelector("main").innerHTML = `
  <section>
    <h2>${h2Text}</h2>
    <div class="container"></div>
  </section>
  `;

  const container = document.querySelector(".container");
  const { results } = data;
  let html = "";

  results.map(result => {
    const { original_title, original_name, poster_path, id } = result;

    html += `
    <a href="/movie-app/detail/index.html?menu=${menu}&id=${id}">
      <div>
        <sapn class="img" style="background-image:url(${imgURL}w500${poster_path}), url(./img/empty.png), url(../img/empty.png)"></sapn>
        <span class="title hidden">${original_title || original_name}</span>
      </div>
    </a>`;
  });

  container.innerHTML = html;
};

const printDetail = response => {
  const { data, error } = response;

  if (error) {
    console.log(error);
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
  <div class="detail">
    <div class="backdrop-img" style="background-image: url(${imgURL}original${backdrop_path})" ></div>
    <span class="poster" style="background-image:url(${imgURL}w500${poster_path}), url(../img/empty.png)"></span>
    <div class="detail-info">
      <h2 class="title">${
        original_title || original_name || "Title cannot be loaded"
      }</h2>
      <p class="info">${info || "Info cannot be loaded"}</p>
      <span class="overview">${overview || "Overview cannot be loaded"}</span>
    </div>
  </div>
  `;

  document.querySelector("main").innerHTML = html;
};

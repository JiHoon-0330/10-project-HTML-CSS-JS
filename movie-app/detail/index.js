let menu = null;
let id = null;
const currentURL = location.href;
const params = currentURL.split("?")[1];
const param = params.split("&");
param.map(param => {
  const currentParam = param.split("=");
  switch (currentParam[0]) {
    case "menu":
      menu = currentParam[1];
      break;
    case "id":
      id = currentParam[1];
      break;
    default:
      break;
  }
});

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

  document.querySelector(
    ".backdrop-img"
  ).style.backgroundImage = `url("${imgURL}original${backdrop_path}")`;

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
  <span class="poster" style="background-image:url(${imgURL}w500${poster_path}), url(../img/empty.png)"></span>
  <div class="detail-info">
    <h2 class="title">${
      original_title || original_name || "Title cannot be loaded"
    }</h2>
    <p class="info">${info || "Info cannot be loaded"}</p>
    <span class="overview">${overview || "Overview cannot be loaded"}</span>
  </div>
  `;

  document.querySelector("main").innerHTML = html;
};

const getDetail = async () => {
  const response = await getApi.detail(menu, id);
  printDetail(response);
};

const init = () => {
  getDetail();
};

init();

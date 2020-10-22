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

  const gen = genres.map(genre => genre.name);
  let episode = 0;
  if (seasons) {
    seasons.map(season => {
      episode += season.episode_count;
    });
  }

  html += `
  <span class="poster" style="background-image:url(${imgURL}w500${poster_path})"></span>
  <div class="detail-info">
    <h2 class="title">${original_title || original_name}</h2>
    <p class="info">${gen} / ${release_date || first_air_date} / ${
    runtime ? `${runtime} minutes` : `${episode} episodes`
  } ${adult ? "/ 18+" : ""}</p>
    <span class="overview">${overview}</span>
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

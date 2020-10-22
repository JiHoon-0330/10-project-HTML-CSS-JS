const currentURL = location.href;
const params = currentURL.split("?")[1];
if (!params) {
  location.href = `${currentURL}?menu=movie`;
}
const menu = params.split("=")[1];
document.querySelector(`.menu-${menu}`).classList.add("select");
document.querySelector("section > h2").textContent =
  menu === "movie" ? "Movie" : "TV";

const printList = response => {
  const container = document.querySelector(".container");
  const { data, error } = response;

  if (error) {
    container.textContent = error;
    return;
  }

  const { results } = data;
  let html = "";

  results.map(result => {
    const { original_title, original_name, poster_path, id } = result;

    html += `
    <a href="./detail/index.html?menu=${menu}&id=${id}">
      <div javascript:getPage>
        <sapn class="img" style="background-image:url(${imgURL}w500${poster_path})"></sapn>
        <span class="title hidden">${original_title || original_name}</span>
      </div>
    </a>`;
  });

  container.innerHTML = html;
};

const getPopularMovie = async () => {
  const response = await getApi.popular(menu);
  printList(response);
};

const init = () => {
  getPopularMovie();
};

init();

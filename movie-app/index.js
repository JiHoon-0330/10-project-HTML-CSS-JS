const currentURL = location.href;
const params = currentURL.split("?")[1];
if (!params) {
  location.href = `${currentURL}?menu=movie`;
}
const menu = params.split("=")[1];
document.querySelector(`.menu-${menu}`).classList.add("select");
const h2Text = menu === "movie" ? "Movie" : "TV";

const getPopularMovie = async () => {
  const response = await getApi.popular(menu);
  printList(response);
};

const getSearchMovie = async word => {
  if (word) {
    const response = await getApi.search(menu, encodeURI(word));
    printList(response);
  } else {
    getPopularMovie();
  }
};

const init = () => {
  getPopularMovie();
};

init();

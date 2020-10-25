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
const h2Text = menu === "movie" ? "Movie" : "TV";

const getDetail = async () => {
  const response = await getApi.detail(menu, id);
  printDetail(response);
};

const getSearchMovie = async word => {
  if (word) {
    const response = await getApi.search(menu, encodeURI(word));
    printList(response);
  } else {
    getDetail();
  }
};

const init = () => {
  getDetail();
};

init();

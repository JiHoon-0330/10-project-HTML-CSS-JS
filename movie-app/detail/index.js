const h2Text = menu === "movie" ? "Movie" : "TV";

const getSearchMovie = async word => {
  const response = await getApi.search(menu, word);
  printList(response);
};

const getDetailMovie = async () => {
  const response = await getApi.detail(menu, id);
  printDetail(response);
};

const getDetail = async () => {
  const search = localStorage.getItem("search");
  if (search && !loading) {
    getSearchMovie(encodeURI(search));
  } else if (!loading) {
    getDetailMovie();
  }
};

const init = () => {
  getDetail();
};

init();

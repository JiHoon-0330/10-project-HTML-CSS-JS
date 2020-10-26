const menuSpan = document.querySelector(`.menu-${menu}`);
if (menuSpan) {
  menuSpan.classList.add("select");
}
const h2Text = menu === "movie" ? "Movie" : "TV";

const getPopularMovie = async num => {
  pageNum = num;
  if (!loading) {
    const response = await getApi.popular(menu, pageNum);
    printList(response);
    if (checkScroll() && !err) {
      getPopularMovie(++pageNum);
    }
  }
};

const getSearchMovie = async (word, num) => {
  if (!loading) {
    if (word) {
      const response = await getApi.search(menu, word, num);
      printList(response);
      if (checkScroll() && !err) {
        getSearchMovie(word, ++pageNum);
      }
    } else {
      getPopularMovie(1);
    }
  }
};

const checkScroll = () => {
  const body = document.querySelector("body");
  const sh = body.scrollHeight;
  const ch = body.clientHeight;
  return sh === ch ? true : false;
};

window.addEventListener("scroll", () => {
  const height =
    this.scrollY +
    this.innerHeight -
    document.querySelector("header").offsetHeight;
  const offset = document.querySelector("main").offsetHeight;

  if (height > offset) {
    if (input.value) {
      getSearchMovie(input.value, ++pageNum);
    } else {
      getPopularMovie(++pageNum);
    }
  }
});

const init = () => {
  getPopularMovie(pageNum);
};

init();

const printList = response => {
  const imgURL = "https://image.tmdb.org/t/p/w500";
  const { data, error } = response;
  if (error) {
    console.log(error);
    return;
  }
  const { results } = data;
  let html = "";
  results.map(result => {
    const { original_title, poster_path } = result;
    html += `<div><sapn class="img" style="background-image:url(${imgURL}${poster_path})"></sapn><span class="title hidden">${original_title}</span></div>`;
  });
  document.querySelector(".container").innerHTML = html;
};

const getPopularMovie = async num => {
  const response = await getApi.popular("movie", num);
  printList(response);
};

const init = () => {
  getPopularMovie(1);
};

init();

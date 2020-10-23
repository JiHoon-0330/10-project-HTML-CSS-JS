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

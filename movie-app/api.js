const imgURL = "https://image.tmdb.org/t/p/";

const getApi = {
  popular: async menu => await api(`${menu}/popular`),
  detail: async (menu, id) => await api(`${menu}/${id}`)
};

const api = async url => {
  console.log(url);
  const apiKey = "api_key=0eeaa62198c78b27a1a864f00b6de917";
  const lang = "language=en-US";
  const baseURL = "https://api.themoviedb.org/3/";
  const params = `?${apiKey}&${lang}&page=${1}`;
  const URL = baseURL + url + params;
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

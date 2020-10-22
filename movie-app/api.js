// const api = axios.create({
//   baseURL: "https://api.themoviedb.org/3/",
//   params: {
//     api_key: "0eeaa62198c78b27a1a864f00b6de917",
//     language: "en-US"
//   }
// });

const apiKey = "api_key=0eeaa62198c78b27a1a864f00b6de917";
const lang = "language=en-US";

const getApi = {
  popular: async (value, num) =>
    await api(`${value}/popular?${apiKey}&${lang}&page=${num}`)
};

const api = async url => {
  const baseURL = "https://api.themoviedb.org/3/";
  const URL = baseURL + url;
  const state = {
    data: null,
    error: "An error has occurred"
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

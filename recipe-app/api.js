const getFirstLetterMeals = async letter => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  ).then(res => res.json());
  console.log(response);
  return response;
};

const getRandomMeals = async () => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  ).then(res => res.json());
  return response;
};

const getIDMeals = async id => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  ).then(res => res.json());
  return response;
};

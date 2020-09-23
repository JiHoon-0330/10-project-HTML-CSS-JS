const getFirstLetterMeals = async letter => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  ).then(res => res.json());
  console.log(response);
};

const getRandomMeals = async () => {
  const randomMeals = [];
  for (let i = 0; i < 5; i++) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    ).then(res => res.json());
    console.log(response.meals[0].strMealThumb);
    randomMeals.push(response);
  }
  console.log(randomMeals[0].meals[0].strMealThumb);
};

getFirstLetterMeals("a");
getRandomMeals();

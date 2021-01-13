const countdown = () => {
  const data = JSON.parse(sessionStorage.getItem("data"));
  let text = data ? data.title : "Happy New Year";
  const nowDate = new Date();
  const newDate = data
    ? new Date(data.date)
    : new Date(`${nowDate.getFullYear() + 1}-01-01 00:00:00`);
  const time = nowDate.getTime() - newDate.getTime();
  const seconds = Math.abs(parseInt((time / 1000) % 60));
  const minutes = Math.abs(parseInt((time / (1000 * 60)) % 60));
  const hours = Math.abs(parseInt((time / (1000 * 60 * 60)) % 24));
  const days = Math.abs(parseInt(time / (1000 * 60 * 60 * 24)));

  document.querySelector("h1").textContent = text;
  document.querySelector(".days > p").textContent = days;
  document.querySelector(".hours > p").textContent = hours;
  document.querySelector(".minutes > p").textContent = minutes;
  document.querySelector(".seconds > p").textContent = seconds;
};

const setHidden = () => {
  document.querySelector(".form").classList.toggle("hidden");
  document.querySelector("main").classList.toggle("hidden");
};

document.querySelector(".change").addEventListener("click", () => {
  setHidden();
});

document.querySelector(".cancel").addEventListener("click", () => {
  setHidden();
});

document.querySelector(".ok").addEventListener("click", () => {
  const title = document.querySelector("#title");
  const date = document.querySelector("#date");

  if (!title.value) {
    title.focus();
    return;
  }

  if (!date.value) {
    date.focus();
    return;
  }

  const data = {
    title: title.value,
    date: `${date.value} 00:00:00`
  };

  sessionStorage.setItem("data", JSON.stringify(data));
  setHidden();
});

const init = () => {
  countdown();
  setInterval(countdown, 1000);

  const newDate = new Date();
  document.querySelector("#date").value = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1
  }-${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()}`;
  console.log(
    `${newDate.getFullYear()}-${
      newDate.getMonth() + 1 < 10
        ? `0${newDate.getMonth() + 1}`
        : newDate.getMonth() + 1
    }-${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()}`
  );
};

init();

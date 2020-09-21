const countdown = () => {
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth();
  const nowDay = nowDate.getDate();
  const newDay = new Date(nowYear, nowMonth + 1, 0).getDate();
  const newMonth = 11 - nowMonth;

  document.querySelector(".months > p").textContent = newMonth;
  document.querySelector(".days > p").textContent = newDay - nowDay - 1;
  document.querySelector(".hours > p").textContent = 23 - nowDate.getHours();
  document.querySelector(".minutes > p").textContent =
    59 - nowDate.getMinutes();
  document.querySelector(".seconds > p").textContent =
    59 - nowDate.getSeconds();
};

countdown();
setInterval(countdown, 1000);

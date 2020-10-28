const url = `https://api.github.com/users/`;

const getUser = async (user = "JiHoon-0330") => {
  const state = {
    error: `failed loading...`,
    data: null
  };

  state.data = await fetch(`${url}${user}`)
    .then(res => {
      if (!res.ok) {
        console.log(`res error`);
        return;
      } else {
        state.error = false;
        return res.json();
      }
    })
    .catch(err => {
      console.log(err);
      return;
    });

  return state;
};

const createUserCard = async user => {
  const response = await getUser(user);
  console.log(response);
  const { data, error } = response;
  const { avatar_url, name, bio, followers, public_repos } = data;
  document.querySelector("main").innerHTML = `
  <span class="img" style="background-image:url(${avatar_url})"></span>
  <div class="user-info">
    <h3 class="profile">github-profile</h3>
    <span class="name">name: ${name}</span>
    <span class="bio">bio: ${bio}</span>
    <span class="followers">followers: ${followers}</span>
    <span class="public_repos">public_repos: ${public_repos}</span>
  </div>
  `;
};

const input = document.querySelector("input");
input.addEventListener("keyup", () => {
  if (window.event.keyCode === 13 && input.value) {
    createUserCard(input.value);
  }
});

const init = () => {
  createUserCard();
};

init();

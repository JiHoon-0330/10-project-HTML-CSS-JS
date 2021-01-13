const input = document.querySelector("input");

const removeTodo = id => {
  const todos = getStorage();
  delete todos[id];
  console.log(todos);
  sessionStorage.setItem(
    "todos",
    JSON.stringify({
      ...todos
    })
  );
  printTodos();
};

const checkTodo = id => {
  const todos = getStorage();
  todos[id].completed = !todos[id].completed;
  sessionStorage.setItem(
    "todos",
    JSON.stringify({
      ...todos
    })
  );
  printTodos();
};

const getStorage = () => {
  const todos = sessionStorage.getItem("todos");
  return todos ? JSON.parse(todos) : {};
};

document.querySelector("ul").addEventListener("click", e => {
  const target = e.target;
  const type = target.dataset.type;
  if (type !== "check" && type !== "remove") {
    return;
  } else {
    const id = target.parentNode.id;
    console.log(id);
    type === "check" && checkTodo(id);
    type === "remove" && removeTodo(id);
  }
});

const printTodos = () => {
  const todos = getStorage();
  let html = "";
  Object.keys(todos).forEach(item => {
    const { id, completed, text } = todos[item];
    html += `
    <li id="${id}">
      <i class="far ${
        completed ? "fa-check-circle" : "fa-circle"
      }" data-type="check"></i>
      <span class="text ${completed ? "completed" : ""}">${text}</span>
      <i class="fas fa-backspace" data-type="remove"></i>
    </li>
    `;
  });
  document.querySelector("ul").innerHTML = html;
};

const setStorage = obj => {
  const todos = getStorage();
  sessionStorage.setItem(
    "todos",
    JSON.stringify({
      ...todos,
      [Date.now()]: {
        id: obj.id || Date.now(),
        completed: obj.completed,
        text: obj.value || input.value
      }
    })
  );
};
const submitTodo = () => {
  setStorage({
    id: null,
    completed: false,
    value: input.value
  });
  printTodos();
};

input.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    if (input.value === "") {
      alert("Please enter your todo");
      return;
    }
    submitTodo();
    input.value = "";
  }
});

const init = () => {
  printTodos();
};

init();

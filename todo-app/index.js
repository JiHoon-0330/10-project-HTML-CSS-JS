const input = document.querySelector("input");

const removeTodo = (todos, id) => {
  for (let i = 0; i < todos.length; i++) {
    console.log(todos[i].id, id);
    if (todos[i].id == id) {
      todos.splice(i, 1);
      break;
    }
  }
  return todos;
};

const removeIcon = id => {
  let todos = getStorage();
  todos = removeTodo(todos, id);
  setStorage(todos);
};

const setRemoveIcon = () => {
  document.querySelectorAll(".remove").forEach(rm => {
    rm.addEventListener("click", e => {
      const id = e.target.parentNode.id;
      removeIcon(id);
    });
  });
};

const setCheck = () => {
  document.querySelectorAll(".check").forEach(ch => {
    ch.addEventListener("click", e => {
      const id = e.target.parentNode.id;
      checkIcon(id);
    });
  });
  document.querySelectorAll(".text").forEach(ch => {
    ch.addEventListener("click", e => {
      const id = e.target.parentNode.id;
      checkIcon(id);
    });
  });
};

const checkTodo = (todos, id) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].completed = !todos[i].completed;
      break;
    }
  }
  return todos;
};

const checkIcon = id => {
  let todos = getStorage();
  todos = checkTodo(todos, id);
  setStorage(todos);
};

const getStorage = () => {
  const todos = sessionStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

const printTodos = () => {
  const todos = getStorage();
  let html = "";
  for (let i = 0; i < todos.length; i++) {
    const { id, completed, text } = todos[i];
    html += `
    <li id="${id}">
      <i class="check far ${completed ? "fa-check-circle" : "fa-circle"}"></i>
      <span class="text ${completed ? "completed" : ""}">${text}</span>
      <i class="fas fa-backspace remove"></i>
    </li>
    `;
  }
  document.querySelector("ul").innerHTML = html;
  setRemoveIcon();
  setCheck();
};

const setStorage = todos => {
  sessionStorage.setItem("todos", JSON.stringify([...todos]));
  printTodos();
};

const setTodo = todos => {
  const todo = {
    id: Date.now(),
    completed: false,
    text: input.value
  };
  todos.push(todo);
  return todos;
};

const submitTodo = () => {
  let todos = getStorage();
  todos = setTodo(todos);
  setStorage(todos);
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

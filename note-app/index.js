// write undefined

const getNotes = () => {
  const item = sessionStorage.getItem("notes");
  if (item) {
    const notes = JSON.parse(item);
    return notes;
  }
  return {};
};

const addSection = (e, id, text) => {
  const section = `
      <section id=${id ? id : Date.now()}>
        <div class="icons">
          <i class="far fa-save" data-type="save"></i>
          <i class="fas fa-trash-alt" data-type="remove"></i>
        </div>
        <textarea class="text">${text ? text : ""}</textarea>
      </section>
      `;
  document.querySelector("main").innerHTML += section;
};

document.querySelector("main").addEventListener("click", e => {
  const target = e.target;
  const type = target.dataset.type;
  if (type !== "save" && type !== "remove") {
    return;
  } else {
    const section = target.parentNode.parentNode;
    type === "save" && saveNote(section);
    type === "remove" && removeNote(section);
  }
});

const printSection = () => {
  const notes = getNotes();
  console.log(notes);
  Object.keys(notes).forEach(item => {
    addSection(null, notes[item].id, notes[item].text);
  });
};

const saveNote = section => {
  const id = section.id;
  const text = section.querySelector(`textarea`).value;
  const notes = getNotes();
  sessionStorage.setItem(
    "notes",
    JSON.stringify({ ...notes, [id]: { id, text } })
  );
  document.querySelector(`[id='${id}'] > textarea`).textContent = text;
};

document.querySelector(".add").addEventListener("click", addSection);

document.querySelector(".clear").addEventListener("click", () => {
  sessionStorage.clear();
  document.querySelector("main").innerHTML = "";
  addSection();
});

const removeNote = section => {
  const id = section.id;
  const notes = getNotes();
  delete notes[id];
  sessionStorage.setItem("notes", JSON.stringify({ ...notes }));
  section.remove();
};

const init = () => {
  printSection();
};

init();

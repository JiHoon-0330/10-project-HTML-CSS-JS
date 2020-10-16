// write undefined

const getNotes = () => {
  const item = sessionStorage.getItem("notes");
  if (item) {
    const notes = JSON.parse(item);
    return notes;
  }
  return [];
};

const addSection = (e, id, text) => {
  const now = new Date();
  const section = `
      <section id=${id ? id : now.getTime()}>
        <div class="icons">
          <i class="far fa-save save"></i>
          <i class="fas fa-trash-alt remove"></i>
        </div>
        <textarea class="text">${text ? text : ""}</textarea>
      </section>
      `;
  document.querySelector("main").innerHTML += section;
  clickIcons();
};

const printSection = notes => {
  if (!notes.length) {
    addSection();
  } else {
    notes.forEach(note => {
      const { id, text } = note;
      addSection(null, id, text);
    });
  }
};

const saveNote = section => {
  let flag = false;
  const id = section.id;
  const text = section.querySelector(`textarea`).value;
  const notes = getNotes();

  const note = {
    id,
    text
  };

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      flag = true;
      notes[i].text = text;
      break;
    }
  }

  if (!flag) {
    notes.push(note);
    notes.sort((a, b) => {
      return a.id - b.id;
    });
  }

  sessionStorage.setItem("notes", JSON.stringify([...notes]));
};

document.querySelector(".add").addEventListener("click", addSection);

document.querySelector(".clear").addEventListener("click", () => {
  sessionStorage.clear();
  document.querySelector("main").innerHTML = "";
  addSection();
});

const removeNote = id => {
  const notes = getNotes();
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes.splice(i, 1);
      break;
    }
  }
  sessionStorage.setItem("notes", JSON.stringify([...notes]));
};

const clickIcons = () => {
  document.querySelectorAll(".save").forEach(save => {
    save.addEventListener("click", e => {
      const section = e.target.parentNode.parentNode;
      saveNote(section);
    });
  });
  document.querySelectorAll(".remove").forEach(remove => {
    remove.addEventListener("click", e => {
      const section = e.target.parentNode.parentNode;
      removeNote(section.id);
      section.remove();
    });
  });
};

const init = () => {
  printSection(getNotes());
};

init();

const titleInputEl = document.getElementById("title-input-field");
const noteTextInputEl = document.getElementById("textArea-input-field");

let allMyNotes = [];
let selectedNote = false;
let selectedID = "";
let noteElement = null;

function create_new_note(inputTitle, inputNote) {
  const idCreated = Math.random();
  const timeStamp = Date.now();
  const note = {
    id: idCreated,
    title: inputTitle,
    note_message: inputNote,
    timestamp: timeStamp,
  };
  allMyNotes.push(note);
  saveToLocalStorage();
  removeElementsByClass();
  loadDataFromAPI();
}

function save_note() {
  if (titleInputEl.value != "" && noteTextInputEl.value != "") {
    console.log(`not empty`);
    if (selectedNote === false) {
      console.log(`create new note function wird gestartet`);
      create_new_note(
        document.getElementById("title-input-field").value,
        document.getElementById("textArea-input-field").value
      );
      return;
    } else {
      console.log("keine neue Notiz wird erstellt");
      serachForNote();
      selectedNote = false;
      removeElementsByClass();
      loadDataFromAPI();
      return;
    }
  } else {
    console.log(`ich bin beim alert block angekommen`);
    alert(`input is missing`);

    return;
  }
}

function delete_note() {
  if (selectedNote == true) {
    let index = allMyNotes.findIndex((el) => {
      return el.id == selectedID;
    });
    allMyNotes.splice(index, 1);
    saveToLocalStorage();
    removeElementsByClass();
    loadDataFromAPI();
  } else {
    console.log(`nothing was deleted`);
  }
}

function removeElementsByClass() {
  let elements = document.getElementsByClassName("single-note");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function create_note_UI(title_message, note_message, timestamp_message, id) {
  const single_note = document.createElement("div");
  single_note.classList.add("single-note");
  single_note.setAttribute("id", id);
  single_note.setAttribute("onclick", `selectNote(${id})`);
  const note = document.createElement("div");
  note.classList.add("note");
  const title = document.createElement("span");
  title.classList.add("title");
  title.setAttribute("data-title-id", id);
  const text_note = document.createElement("span");
  text_note.classList.add("text");
  text_note.setAttribute("data-text-id", id);
  const br1 = document.createElement("br");
  const br2 = document.createElement("br");
  const text = document.createElement("span");
  text.classList.add("text");
  const time_stamp = document.createElement("div");
  time_stamp.classList.add("time-stamp");
  const time = document.createElement("span");
  time.classList.add("time");

  let new_title_message = document.createTextNode(title_message);
  let new_note_message = document.createTextNode(note_message);
  let new_timestamp_message = document.createTextNode(timestamp_message);

  title.appendChild(new_title_message);
  text_note.appendChild(new_note_message);
  time.appendChild(new_timestamp_message);

  single_note.append(note);
  note.appendChild(title);
  note.appendChild(br1);
  note.appendChild(br2);
  note.appendChild(text_note);
  single_note.appendChild(time_stamp);
  time_stamp.appendChild(time);

  let root = document.getElementById("note-list");
  root.appendChild(single_note);
}

function selectNote(noteID) {
  removeElementsByClass();
  loadDataFromAPI();
  noteElement = document.getElementById(noteID);
  noteElement.classList.add("selectedNote");
  let previousTitle = document.querySelector(
    `[data-title-id="${noteID}"]`
  ).innerHTML;
  let previousText = document.querySelector(
    `[data-text-id="${noteID}"]`
  ).innerHTML;
  document.getElementById("title-input-field").value = previousTitle;
  document.getElementById("textArea-input-field").value = previousText;
  selectedNote = true;
  selectedID = noteID;
}

function serachForNote() {
  let index = allMyNotes.findIndex((el) => {
    return el.id == selectedID;
  });
  allMyNotes[index].title = document.getElementById("title-input-field").value;
  allMyNotes[index].note_message = document.getElementById(
    "textArea-input-field"
  ).value;
  allMyNotes[index].timestamp = Date.now();
  saveToLocalStorage();
}

function clearInputFields() {
  document.getElementById("title-input-field").value = "";
  document.getElementById("textArea-input-field").value = "";
  selectedNote = false;
}

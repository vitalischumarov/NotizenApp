window.addEventListener("load", (event) => {
  removeElementsByClass();
  loadDataFromAPI();
});

function loadDataFromAPI() {
  const rawData = localStorage.getItem("allNotesData");
  if (rawData) {
    const data = JSON.parse(rawData);
    allMyNotes = data.sort((a, b) => b.timestamp - a.timestamp);
    for (let i = 0; i < allMyNotes.length; i++) {
      let date = new Date(allMyNotes[i].timestamp);
      let formattedDate = date.toLocaleString("de-DE");
      createNoteUI(
        allMyNotes[i].title,
        allMyNotes[i].note_message,
        formattedDate,
        allMyNotes[i].id
      );
    }
  } else {
    console.log(`data not loaded`);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("allNotesData", JSON.stringify(allMyNotes));
  clearInputFields();
}

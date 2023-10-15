console.log("Welcome to notes app. This is app.js");

showNotes();


// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";

  notesObj.forEach(function (element, index) {
    let date = new Date(element.timestamp);
    let dateLocale = date.toLocaleDateString();
    let timeLocale = date.toLocaleTimeString();

    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <h8>${element.isEdited?'Edited': 'Posted'}: ${dateLocale} - ${timeLocale}</h8>
                    <hr color="#fff"/>
                    <p class="card-text"> ${element.text}</p>
                    <button id="${index}"onclick="editNote(this.id)" class="btn btn-primary">Edit</button>
                    <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    notesElm.style.color = "rgb(162, 240, 255)";
  }
}

// edit a particular note
function editNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const editedNote = prompt("Edit note:", ""); // Provide an empty string

  if (editedNote !== null) {
      const currentDate = new Date();
      const updatedDate = currentDate.toLocaleDateString();
      const updatedTime = currentDate.toLocaleTimeString();
      const editedContent = editedNote;

      // Update the note in the array
      notes[index] = {
          text: editedContent,
          timestamp: currentDate.toJSON(),
          isEdited: true
      };

      localStorage.setItem("notes", JSON.stringify(notes));
      showNotes(); // Refresh the notes
  }
}




// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let addTxt = document.getElementById("addTxt");

  if (!addTxt.value.trim()) {
    const toast = document.getElementById("emptyFormToast");
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
    return;
  }

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let note = {
    text: addTxt.value,
    timestamp: new Date().toJSON(),
    important: false,

    "text": addTxt.value,
    "timestamp": new Date().toJSON(),
    "isEdited": false

  };

  notesObj.push(note);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  //   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";

  notesObj.forEach(function (element, index) {
    let date = new Date(element.timestamp);
    let dateLocale = date.toLocaleDateString();
    let timeLocale = date.toLocaleTimeString();
    let starClass = element.important
      ? "fa-solid fa-star star-important"
      : "fa-regular fa-star";
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <div class="noteHead">
                          <h5 class="card-title">Note ${index + 1}</h5>
                          <i class="${starClass}" onclick="toggleStar(${index})"></i>
                        </div>
                        <h8>Posted: ${dateLocale} - ${timeLocale}</h8>
                        <hr color="#fff"/>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    notesElm.style.color = "rgb(162, 240, 255)";
  }
}

function toggleStar(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj[index].important = !notesObj[index].important;

  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else { 
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}





let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

/*
Further Features:
1. Separate notes by user
2. Sync and host to web server 
*/

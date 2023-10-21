console.log("Welcome to notes app. This is app.js");
showNotes();
let notes = [];

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
    };

    notesObj.push(note);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    //   console.log(notesObj);
    showNotes();
});

// function to show notes so the sort option will not stored in localstorage
function displayNotes() {
    let html = "";

    notesObj.forEach(function (element, index) {
        let className = element.fav
            ? `fa fa-star checked`
            : `fa-regular fa-star-o unchecked`;
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
                          <div><i id="favFlag" class="${className}" onClick=saveFavorite(${index})></i></div>
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
        notesElm.style.color = "black";
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
        notesElm.style.color = "white";
    }
}

// show element from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    displayNotes(notesObj);
}

// toggle important note
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

// sort notes
function sortNotes(criteria) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    switch (criteria) {
        case "dateAsc":
            notesObj.sort(sortByDateAscending);
            break;
        case "dateDesc":
            notesObj.sort(sortByDateDescending);
            break;
        case "importance":
            notesObj.sort(sortByImportance);
            break;
        case "wordCount":
            notesObj.sort(sortByWordCount);
            break;
        default:
            break;
    }

    displayNotes(notesObj);
}

// Function to delete a note
function deleteNote(index) {
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

// Function to save as favorite
function saveFavorite(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let favFlag = notesObj[index].fav;
    notesObj[index].fav = favFlag ? false : true;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

function sortByDateAscending(a, b) {
    return new Date(a.timestamp) - new Date(b.timestamp);
}

function sortByDateDescending(a, b) {
    return new Date(b.timestamp) - new Date(a.timestamp);
}

function sortByImportance(a, b) {
    return a?.fav === b?.fav ? 0 : a?.fav ? -1 : 1;
}

function sortByWordCount(a, b) {
    return a.text.split(" ").length - b.text.split(" ").length;
}

//Search the note
const searchNote = document.querySelector("[note-search]");

searchNote.addEventListener("input", (elem) => {
    const values = elem.target.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach((noteCard) => {
        const isAvailable = noteCard
            .getElementsByTagName("p")[0]
            .innerText.toLowerCase()
            .includes(values);
        noteCard.classList.toggle("hide", !isAvailable);
    });
});

/*
Further Features:
1. Separate notes by user
2. Sync and host to web server 
*/

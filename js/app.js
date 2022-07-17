
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let Obj = {
        title : addTitle.value,
        txt : addTxt.value
    }
    notesObj.push(Obj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.txt}</p>
              <button class="btn btn-primary" id="${index}" onclick="delNote(this.id)">Delete</button>
            </div>
          </div>
        `
    })
    let savedNotesElement = document.getElementById('savednotes');
    if (notesObj.length != 0) {
        savedNotesElement.innerHTML = html;
    } else {
        html = `<H6>No Saved Notes are Present.</H6>`
        savedNotesElement.innerHTML = html;
    }
}

function delNote(ind) {
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    notesObj.splice(ind, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('card my-2 mx-2');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
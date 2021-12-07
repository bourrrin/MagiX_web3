let notes;
let index = 0;

window.addEventListener("load", () => {
    getNotes();
    document.querySelector(".previous_note").addEventListener("click", () => {
        changeNote(true);
    });
    document.querySelector(".next_note").addEventListener("click", () => {
        changeNote(false);
    });
    document.querySelector(".supprimer_note").addEventListener("click", deleteNotes);
    document.querySelector(".add_note").addEventListener("click", displayAddNote);
    document.querySelector(".enter_note").addEventListener("click", addNotes);
    document.querySelector(".exit_add_note").addEventListener("click", displayReadNote);

    document.querySelector(".modify_note").addEventListener("click", displayModifyNote);
    document.querySelector(".enter_modify_note").addEventListener("click", modifyNotes);
});

function changeNote(params) {
    document.querySelector(".note_container").classList.add("fermer_note");

    if (params) {
        index--;
        if (index < 0) {
            index = notes.length - 1;
        }
    } else {
        index++;
        if (index >= notes.length) {
            index = 0;
        }
    }

    setTimeout(() => {
        document.querySelector(".note_container").classList.remove("fermer_note");
        displayNotes(index);
    }, 500);
}

//#region DAO

function getNotes() {
    let formData = new FormData();
    formData.append("DAO", "get");

    fetch("notesAjax.php", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
        .then((response) => response.json())
        .then((response) => {
            notes = response;
            displayNotes(0);
        });
}

function addNotes() {
    let note = document.querySelector("#new_note").value;
    let formData = new FormData();
    formData.append("DAO", "add");
    formData.append("note", note);

    fetch("notesAjax.php", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
        .then((response) => response.json())
        .then((response) => {
            getNotes();
            setTimeout(() => {
                displayReadNote();
            }, 500);
        });
}

function deleteNotes() {
    let id = notes[index]["id"];

    if (id != "") {
        let formData = new FormData();
        formData.append("DAO", "delete");
        formData.append("id", id);

        fetch("notesAjax.php", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                getNotes();
                setTimeout(() => {
                    displayReadNote();
                }, 500);
            });
    }
}

function modifyNotes() {
    let id = notes[index]["id"];
    let note = document.querySelector("#new_note").value;

    let formData = new FormData();
    formData.append("DAO", "modify");
    formData.append("id", id);
    formData.append("note", note);

    fetch("notesAjax.php", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
        .then((response) => response.json())
        .then((response) => {
            getNotes();
            setTimeout(() => {
                displayReadNote();
            }, 500);
        });
}

//#endregion

//#region DISPLAY
function displayNotes(index) {
    if (notes.length > 0) {
        document.querySelector(".date").innerHTML = notes[index]["dates"];
        document.querySelector(".numerotation").innerHTML = index + 1 + "/" + notes.length;
        document.querySelector(".note_body").innerHTML = notes[index]["note"];
    } else {
        document.querySelector(".note_body").innerHTML = "NO NOTES FOUND";
    }
}

function displayAddNote() {
    document.querySelector(".note_container").classList.add("fermer_note");

    document.querySelector(".read_note").style.display = "none";
    document.querySelector(".create_note").style.display = "flex";

    document.querySelector(".enter_note").style.display = "flex";
    document.querySelector(".enter_modify_note").style.display = "none";
    document.querySelector(".date").innerHTML = "";
    document.querySelector(".numerotation").innerHTML = "";

    setTimeout(() => {
        document.querySelector(".note_container").classList.remove("fermer_note");
    }, 500);
}

function displayModifyNote() {
    document.querySelector(".note_container").classList.add("fermer_note");

    document.querySelector(".read_note").style.display = "none";
    document.querySelector(".create_note").style.display = "flex";
    document.querySelector(".enter_note").style.display = "none";
    document.querySelector(".enter_modify_note").style.display = "flex";
    document.querySelector(".enter_modify_note").style.display = "flex";
    document.querySelector("#new_note").value = document.querySelector("#note_content").innerHTML;

    setTimeout(() => {
        document.querySelector(".note_container").classList.remove("fermer_note");
    }, 500);
}

function displayReadNote() {
    document.querySelector(".note_container").classList.add("fermer_note");

    document.querySelector(".create_note").style.display = "none";
    document.querySelector(".read_note").style.display = "flex";
    displayNotes(0);

    setTimeout(() => {
        document.querySelector(".note_container").classList.remove("fermer_note");
    }, 500);
}

//#endregion

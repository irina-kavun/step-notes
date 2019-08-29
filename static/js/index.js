//listen click on the button to add new note
const addNoteButton = document.querySelector('#add-note');
addNoteButton.addEventListener('click',() => {
    window.location.href = '/notes';
});

const addListButton = document.querySelector('#add-list');
addListButton.addEventListener('click',() => {
    window.location.href = '/lists';
});


//listen click within each note
const noteContainer = document.querySelector('#notesList');
noteContainer.addEventListener('click', (event)=> {
    const target = event.target;

    if (target.closest('.note-container') !== null) {
        const cardType = target.closest('.note-container').dataset.type;
        const id = target.closest('.note-container').dataset.id;

        //if click is on the close-button - delete the note
        if (target.classList.contains('btn-danger')) {
            return deleteNote(id, cardType);
        } else {
            return openNote(id, cardType);
        }
    }
});

//delete note function with method DELETE
async function deleteNote(id, tmpPath) {
    let data = {
        _id: id
    };

    let request = await fetch(`/api/${tmpPath}/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });

    let answer = await request.json();
    if (answer.deleted){
        const noteSelect = document.querySelector(`.note-container[data-id="${id}"]`);
        noteSelect.remove();
    }
}

// open note function
async function openNote(id, tmpPath) {
    window.location.href = `/${tmpPath}/${id}`;
}


// selectors for buttons edit and delete note
const editNoteButton = document.querySelector('#editNoteButton');
const deleteNoteButton = document.querySelector('.delete-note-btn');

//edit button listener
editNoteButton.addEventListener('click', editNote);

deleteNoteButton.addEventListener('click', deleteNote)

async function editNote() {
    const titleValue = document.querySelector('#note-title').value;
    const textValue = document.querySelector('#note-text').value;

    // data will send to database, replace values of properties from input fields
    let noteId = editNoteButton.dataset.id;
    let data = {
        _id: noteId,
        title : titleValue, // input 1
        text: textValue //input 2
    };

    // put request
    let request = await fetch(`/api/notes/${noteId}`,
        {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    let answer = await request.json();
    if (answer.edited) {
        window.location.href = '/';
    }
}

async function deleteNote() {
    let noteId = deleteNoteButton.dataset.id;
    let data = {
        _id: noteId,
    };

    // delete request
    let request = await fetch(`/api/notes/${noteId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    let answer = await request.json();
    if (answer.deleted){
        window.location.href = '/';
    }
}
    // selector for button create new note
    const createNoteButton = document.querySelector('#createNoteButton');

    //create button listener
    createNoteButton.addEventListener('click', createNote);

    async function createNote() {
        const titleValue = document.querySelector('#note-title').value;
        const textValue = document.querySelector('#note-text').value;

        // data will send to database, replace values of properties from input fields
        let data = {
            _type: 'notes',
            title: titleValue,  // input 1
            text: textValue //input 2
        };

        // post request
        let request = await fetch('/api/notes',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

        let answer = await request.json();
        if (answer.created) {
            window.location.href = '/';
        }
}


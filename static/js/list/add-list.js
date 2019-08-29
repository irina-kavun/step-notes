const saveBtn = document.querySelector(".input-group-addon")
const taskList = document.querySelector('.container-for-task-item')
const area = document.querySelector('.area-label')
const creatToDoList = document.querySelector('.creat-list-btn')
let currentLabelItem
let currentLabelVal

saveBtn.addEventListener('click', () => {
    const warningText = document.querySelector('.warning-enter-text')
    const area = document.querySelector('.area-label')
    let taskVal = area.value

    if (taskVal) {
        warningText.classList.add('not-active')
        warningText.classList.remove('active')
        let id = Date.now()

        taskList.innerHTML += `<div class="funkyradio">
                                <div class="funkyradio-success">
                                    <input class="checkbox" type="checkbox" name="checkbox" id='${id}' >
                                    <label class="task" for='${id}'>${taskVal}</label>
                                    <span class="${id} close-btn bg-white"><span class="glyphicon glyphicon-remove text-danger"></span></span>
                                    <span class="${id} edit-btn bg-white"><span class="glyphicon glyphicon-edit text-warning"></span></span>
                                    </div>
                                </div>`
        area.value = ''
    } else {
        warningText.classList.add('active')
        warningText.classList.remove('not-active')
    }
})

taskList.addEventListener('click', (event) => {
    let taskWrap = event.target.closest('.funkyradio')
    let target = event.target;

    if (target.className === 'glyphicon glyphicon-edit text-warning' ) {
        editTask(target)
    } else if (target.className === 'glyphicon glyphicon-ok save-change') {
        saveChangeTask(target)
    } else if (target.className === 'glyphicon glyphicon-remove text-danger') {
        taskWrap.remove()
    } else if (target.className === 'checkbox') {
        target.hasAttribute('checked') ? target.removeAttribute('checked') : target.setAttribute('checked', '')
    }

})

creatToDoList.addEventListener('click', async () => {
    let titleVal = document.querySelector('#note-title').value
    let listsTaskText = taskList.querySelectorAll('label')
    let listsTaskStatus = taskList.querySelectorAll('input')
    let lists = []

if (listsTaskText.length !== 0) {
    for (let i = 0; i < listsTaskText.length; i++ ) {
                let task = {
                    text: listsTaskText[i].innerText,
                       status: listsTaskStatus[i].checked
                };
                lists.push(task)
            }

    let data = {
        _type: 'lists',
        title: titleVal,
        inputs: lists
    };

    let req = await fetch('/api/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

        let answer = await req.json();
        if (answer.created) {
            window.location.href = '/';
        }
    }

});

function editTask(target) {
    currentLabelItem = target.closest('.funkyradio')
    currentLabelVal = target.parentElement.parentElement.querySelector('.task').innerText
    let areaEdit = taskList.querySelector('#form-edit-wrap')

    if (areaEdit) {
        areaEdit.remove()
    }
    let formForEditArea = document.createElement('div')
    formForEditArea.setAttribute('method', 'post')
    formForEditArea.innerHTML = `<div id = 'form-edit-wrap' class="form-group">
                                            <div class="input-group" data-validate="length" data-length="5">
                                                <textarea type="text" class="form-control area-label area-edit" name="validate-length" id="validate-length" placeholder="Enter yours task" required > ${currentLabelVal} </textarea>
                                                <span class="input-group-addon success"><span class="glyphicon glyphicon-ok save-change"></span></span>
                                            </div>
                                         </div>`

    area.value = ""
    currentLabelItem.appendChild(formForEditArea)
}
function saveChangeTask(target) {
    let areaEdit = taskList.querySelector('.area-edit')
    let areaEditVal = areaEdit.value
    let label

    currentLabelItem = target.closest('.funkyradio')
    label = currentLabelItem.querySelector('.task')
    label.innerText = areaEditVal

    areaEdit.closest('.form-group').remove()
    area.closest('.area-creat-task').classList.remove('not-active')
}


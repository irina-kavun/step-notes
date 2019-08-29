const saveBtn = document.querySelector(".input-group-addon");
const taskList = document.querySelector(".container-for-task-item");
const area = document.querySelector(".area-label");
const editBtnToDo = document.querySelector(".edit-list-btn");
const checked = document.querySelector(".checkbox");
const deleteListButton = document.querySelector(".delete-list-btn");
let completedTasks = document.querySelectorAll(".container-for-task-item")[1];
// let isDone = false;
let currentLabelItem;
let currentLabelVal;
saveBtn.addEventListener("click", () => {
    const warningText = document.querySelector(".warning-enter-text");
    const area = document.querySelector(".area-label");
    let taskVal = area.value;
    if (taskVal) {
        warningText.classList.add("not-active");
        warningText.classList.remove("active");
        let id = Date.now();
        taskList.innerHTML += `<div class="funkyradio">
                                <div class="funkyradio-success">
                                    <input class="checkbox" type="checkbox"  name="checkbox" id='${id}' >
                                    <label class="task" for='${id}'>${taskVal}</label>
                                    <span class="${id} close-btn bg-white"><span class="glyphicon glyphicon-remove text-danger"></span></span>
                                    <span class="${id} edit-btn bg-white"><span class="glyphicon glyphicon-edit text-warning"></span></span>
                                    </div>
                                </div>`;
        area.value = "";
        // isDone = !isDone
    } else {
        warningText.classList.add("active");
        warningText.classList.remove("not-active");
    }
});

taskList.addEventListener("click", taskManager);

const uncompletedWrapper = document.querySelector('#uncompleted_tasks');
const completedWrapper = document.querySelector('#completed_tasks');

editBtnToDo.addEventListener("click", async () => {
    let titleVal = document.querySelector("#note-title").value;

    // uncompleted task items
    let uncompletedTaskText = uncompletedWrapper.querySelectorAll("label");
    let uncompletedTaskStatus = uncompletedWrapper.querySelectorAll("input");

    // completed task items
    let completedTaskText = completedWrapper.querySelectorAll("label");
    let completedTaskStatus = completedWrapper.querySelectorAll("input");

    let lists = [];
    if (uncompletedTaskText.length !== 0 || completedTaskText.length !== 0) {

        if (uncompletedTaskText.length !== 0) {
            for (let i = 0; i < uncompletedTaskText.length; i++) {
                let task = {
                    text: uncompletedTaskText[i].innerText,
                    status: uncompletedTaskStatus[i].checked
                };
                lists.push(task);
            }
        }

        if (completedTaskText.length !== 0) {
            for (let i = 0; i < completedTaskText.length; i++) {
                let task = {
                    text: completedTaskText[i].innerText,
                    status: completedTaskStatus[i].checked
                };
                lists.push(task);
            }
        }

        let listId = editBtnToDo.dataset.id;

        let data = {
            _id: listId,
            _type: "lists",
            title: titleVal,
            inputs: lists
        };

        let req = await fetch(`/api/lists/${listId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let answer = await req.json();
        if (answer.edited) {
            window.location.href = '/';
        }
    }
});

deleteListButton.addEventListener("click", async () => {
    let listId = deleteListButton.dataset.id;
    let data = {
        _id: listId
    };

    let req = await fetch(`/api/lists/${listId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    let answer = await req.json();
    if (answer.deleted) {
        window.location.href = '/';
    }
});

function editTask(target) {
    currentLabelItem = target.closest(".funkyradio");
    currentLabelVal = target.parentElement.parentElement.querySelector(".task")
        .innerText;
    let areaEdit = taskList.querySelector("#form-edit-wrap");
    let areaEditCompleted = completedTasks.querySelector("#form-edit-wrap");
    if (areaEdit) {
        areaEdit.remove();
    }
    if (areaEditCompleted) {
        areaEditCompleted.remove();
    }
    let formForEditArea = document.createElement("div");
    formForEditArea.setAttribute("method", "post");
    formForEditArea.innerHTML = `<div id ='form-edit-wrap' class="form-group">
                                            <div class="input-group" data-validate="length" data-length="5">
                                                <textarea type="text" class="form-control area-label area-edit" name="validate-length" id="validate-length" placeholder="Enter yours task" required > ${currentLabelVal} </textarea>
                                                <span class="input-group-addon success"><span class="glyphicon glyphicon-ok save-change"></span></span>
                                            </div>
                                         </div>`;
    area.value = "";
    currentLabelItem.appendChild(formForEditArea);
}

function saveChangeTask(event) {
    const taskType = event.currentTarget.parentElement.attributes.id.value;
    if (taskType === "uncompleted_tasks") {
        editTaskType(taskList);
    } else {
        editTaskType(completedTasks);
    }
}
document.getElementById("completed_tasks").addEventListener("click", ({ target }) => {
    if (target.className === "task") {
        toggleDone(target, 0);
        // target.classList.remove("line-through")
    }
});
completedTasks.addEventListener("click", taskManager);
function taskManager(event) {
    let target = event.target;
    let taskWrap = target.closest(".funkyradio");
    if (target.className === "glyphicon glyphicon-edit text-warning") {
        editTask(target);
    } else if (target.className === "glyphicon glyphicon-ok save-change") {
        saveChangeTask(event);
    } else if (target.className === "glyphicon glyphicon-remove text-danger") {
        taskWrap.remove();
    } else if (target.className === "checkbox") {
        target.hasAttribute("checked")
            ? target.removeAttribute("checked")
            : target.setAttribute("checked", "");
    }
    if (target.className === "task") {
        toggleDone(target, 1);
        // target.classList.add("line-through")
    }
}
function toggleDone(target, id) {
    const checkedElem = target.closest(".funkyradio-success").children[0];
    console.log(`IS CHECKED: ${checkedElem.hasAttribute("checked")}`);
    const notCompleted = document.getElementsByClassName(
        "container-for-task-item"
    )[id];
    console.log(checkedElem);
    notCompleted.appendChild(target.closest(".funkyradio"));
    console.log(target);
}
function editTaskType(type) {
    let areaEdit = type.querySelector(".area-edit");
    let areaEditVal = areaEdit.value;
    let label;
    currentLabelItem = event.target.closest(".funkyradio");
    label = currentLabelItem.querySelector(".task");
    label.innerText = areaEditVal;
    areaEdit.closest(".form-group").remove();
    area.closest(".area-creat-task").classList.remove("not-active");
}
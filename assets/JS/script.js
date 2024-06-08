const taskInput = document.getElementById("task-input");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

let liIndex = null;

Element.prototype.insertChildAtIndex = function (child, index) {
    if (index === null) index = this.children.length;
    if (index >= this.children.length) {
        this.appendChild(child);
    } else {
        console.log(this.children.length, index);
        this.insertBefore(child, this.children[index]);
    }
    liIndex = null;
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskTitle = taskInput.value;

    if (taskTitle == "") {
        alert("Please Enter Task");
    } else {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<p>${taskTitle}</p>`;

        taskList.insertChildAtIndex(listItem, liIndex);

        // add edit button.
        let editBtn = document.createElement("span");
        editBtn.setAttribute("class", "edit_btn");
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        listItem.appendChild(editBtn);

        let removeBtn = document.createElement("span");
        removeBtn.setAttribute("class", "remove_btn");
        removeBtn.innerHTML = `&times;`;
        listItem.appendChild(removeBtn);

        taskInput.value = "";
        taskInput.focus();
        saveListData();
    }
});

taskList.addEventListener("click", (e) => {
    if (e.target.tagName == "P") {
        if(!e.target.classList.contains("checked")){
            e.target.classList.add("checked");
            const editBtn = e.target.nextElementSibling;
            editBtn.remove();
            saveListData();
        }
    }

    if (e.target.parentElement.tagName === "SPAN") {
        const text = e.target.parentElement.previousSibling.innerText;
        const li = e.target.parentElement.parentElement;
        const ul = e.target.parentElement.parentElement.parentElement;
        console.log(li.children[0].innerText);
        const index = Array.from(ul.children).findIndex(ele => ele.childNodes[0].innerText == li.childNodes[0].innerText);

        liIndex = index;
        ul.children[index].remove();
        taskInput.value = text;
    }

    if (e.target.tagName == "SPAN" && e.target.className === "remove_btn") {
        const li = e.target.parentElement;
        li.remove();
        saveListData();
    }

});

function showListData() {
    taskList.innerHTML = localStorage.getItem("listItem");
}

function saveListData() {
    localStorage.setItem("listItem", taskList.innerHTML);
}

showListData();
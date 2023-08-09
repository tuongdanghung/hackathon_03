"use strict";
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("nameInput");
const userList = document.getElementById("userList");
let tasks = registerLocal();
console.log(tasks);
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const maxId = tasks.reduce((max, user) => Math.max(max, user.id), 0);
    if (name) {
        const newTask = {
            id: tasks.length == 0 ? 0 : maxId + 1,
            name: name,
        };
        tasks.push(newTask);
        renderTask();
        userForm.reset();
    }
    if (name.length === 0) {
        const errAgeElement = document.getElementById("errName");
        errAgeElement.style.display = "block";
    }
    const myArrayJson = JSON.stringify(tasks);
    localStorage.setItem("task", myArrayJson);
});
function renderTask() {
    let newRender = "";
    tasks.forEach((user) => {
        newRender += `
        <div class="list">
            <p>name: ${user.name}</p>
            <button class="delete" data-id="${user.id}">Delete</button>
        </div>`;
    });
    const userList = document.getElementById("userList");
    userList.innerHTML = newRender;
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const userId = parseInt(button.getAttribute("data-id") || "0", 10);
            handleDelete(userId);
        });
    });
}
function handleDelete(userId) {
    tasks = tasks.filter((user) => user.id !== userId);
    const myArrayJson = JSON.stringify(tasks);
    localStorage.setItem("task", myArrayJson);
    renderTask();
}
function registerLocal() {
    const results = localStorage.getItem("task");
    const myArray = JSON.parse(results !== null && results !== void 0 ? results : "null");
    return myArray ? myArray : [];
}
renderTask();

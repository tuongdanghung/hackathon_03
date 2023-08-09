"use strict";
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("nameInput");
const userList = document.getElementById("userList");
let users = registerLocal();
console.log(users);
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    if (name) {
        const newUser = {
            id: users.length == 0 ? 0 : maxId + 1,
            name: name,
        };
        users.push(newUser);
        renderUsers();
        userForm.reset();
    }
    if (name.length === 0) {
        const errAgeElement = document.getElementById("errName");
        errAgeElement.style.display = "block";
    }
    const myArrayJson = JSON.stringify(users);
    localStorage.setItem("user", myArrayJson);
});
function renderUsers() {
    let userl = "";
    users.forEach((user) => {
        userl += `
        <div class="list">
                    <p>name: ${user.name}</p>
                    <button class="delete" data-id="${user.id}">Delete</button>
                </div>`;
    });
    const userList = document.getElementById("userList");
    userList.innerHTML = userl;
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const userId = parseInt(button.getAttribute("data-id") || "0", 10);
            handleDelete(userId);
        });
    });
}
function handleDelete(userId) {
    users = users.filter((user) => user.id !== userId);
    const myArrayJson = JSON.stringify(users);
    localStorage.setItem("user", myArrayJson);
    renderUsers();
}
function registerLocal() {
    const results = localStorage.getItem("user");
    const myArray = JSON.parse(results !== null && results !== void 0 ? results : "null");
    return myArray ? myArray : [];
}
renderUsers();

"use strict";
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("nameInput");
const userList = document.getElementById("userList");
const pointInput = document.getElementById("pointInput");
let tasks = registerLocal();
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const maxId = tasks.reduce((max, user) => Math.max(max, user.id), 0);
    const name = nameInput.value;
    const point = 0;
    if (name) {
        const newTask = {
            id: tasks.length == 0 ? 0 : maxId + 1,
            name: name,
            point: point,
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
    localStorage.setItem("point", myArrayJson);
});
function renderTask() {
    let newRender = "";
    let sum = 0;
    tasks.forEach((user) => {
        sum += user.point;
        newRender += `
        <div class="list">
            <div class="icon-item">
                <button class="delete" data-id="${user.id}">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <i id="${user.id}" class="fa-solid fa-trophy typo" id="trophy"> </i>
                <p>${user.name}</p>
            </div>
            <div class="point">
                <button class="decrease" data-id="${user.id}">-</button>
                <div>
                    <p>
                        point: <input disabled type="text" id="pointInput" value="${user.point}"/>
                    <p>
                </div>
                <button class="increase" data-id="${user.id}">+</button>
            </div>
        </div>`;
    });
    const totalPoint = document.getElementById("total");
    totalPoint.innerHTML = String(sum);
    //
    const playerPoint = document.getElementById("player");
    playerPoint.innerHTML = String(tasks.length);
    //
    const userList = document.getElementById("userList");
    userList.innerHTML = newRender;
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const userId = parseInt(button.getAttribute("data-id") || "0", 10);
            handleDelete(userId);
        });
    });
    const increaseButtons = document.querySelectorAll(".increase");
    increaseButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const userId = parseInt(button.getAttribute("data-id") || "0", 10);
            handleIncrease(userId);
        });
    });
    const decreaseButtons = document.querySelectorAll(".decrease");
    decreaseButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const userId = parseInt(button.getAttribute("data-id") || "0", 10);
            handleDecrease(userId);
        });
    });
    const maxPoint = Math.max(...tasks.map((item) => item.point));
    const objectsWithMaxPoint = tasks.filter((item) => item.point === maxPoint);
    for (let i = 0; i < objectsWithMaxPoint.length; i++) {
        const nameElement = document.getElementById(`${objectsWithMaxPoint[i].id}`);
        nameElement.style.color = "red";
    }
}
function handleDelete(userId) {
    tasks = tasks.filter((user) => user.id !== userId);
    const myArrayJson = JSON.stringify(tasks);
    localStorage.setItem("point", myArrayJson);
    renderTask();
}
function registerLocal() {
    const results = localStorage.getItem("point");
    const myArray = JSON.parse(results !== null && results !== void 0 ? results : "null");
    return myArray ? myArray : [];
}
renderTask();
function handleIncrease(userId) {
    const userIncrease = tasks.find((user) => user.id === userId);
    if (userIncrease) {
        userIncrease.point += 1;
    }
    const myArrayJson = JSON.stringify(tasks);
    localStorage.setItem("point", myArrayJson);
    renderTask();
}
function handleDecrease(userId) {
    // giam 1
    const userIncrease = tasks.find((user) => user.id === userId);
    if (userIncrease && userIncrease.point > 0) {
        userIncrease.point -= 1;
        const myArrayJson = JSON.stringify(tasks);
        localStorage.setItem("point", myArrayJson);
        renderTask();
    }
    else {
        alert("không thể nhỏ hơn không");
        return;
    }
}

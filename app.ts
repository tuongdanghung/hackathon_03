interface Title {
    id: number;
    name: string;
}

const userForm = document.getElementById("userForm") as HTMLFormElement;
const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const userList = document.getElementById("userList") as HTMLDivElement;
let tasks: Title[] = registerLocal();
console.log(tasks);
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const maxId = tasks.reduce((max, user) => Math.max(max, user.id), 0);
    if (name) {
        const newTask: Title = {
            id: tasks.length == 0 ? 0 : maxId + 1,
            name: name,
        };
        tasks.push(newTask);
        renderTask();
        userForm.reset();
    }
    if (name.length === 0) {
        const errAgeElement = document.getElementById("errName") as HTMLElement;
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

    const userList = document.getElementById(
        "userList"
    ) as HTMLTableSectionElement;
    userList.innerHTML = newRender;
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const userId = parseInt(button.getAttribute("data-id") || "0", 10);
            handleDelete(userId);
        });
    });
}
function handleDelete(userId: number) {
    tasks = tasks.filter((user) => user.id !== userId);
    const myArrayJson = JSON.stringify(tasks);
    localStorage.setItem("task", myArrayJson);
    renderTask();
}

function registerLocal() {
    const results: string | null = localStorage.getItem("task");
    const myArray = JSON.parse(results ?? "null");
    return myArray ? myArray : [];
}
renderTask();

let todoData = {
    "Default Todo": [],
};

class CreateTodo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

// Get created todo data from local storage when website refreshed or closed
const storedTodoData = localStorage.getItem("todoData");

if(storedTodoData) {
    todoData = JSON.parse(storedTodoData);
}

const handleCreateTodo = () => {
    const target = prompt("Target?", "Default Todo");

    if(!target) return;

    if(!todoData.hasOwnProperty(target)) {
        alert(`There's no ${target} in the Todo Data!`);
        return;
    }

    const title = prompt("Todo's title?");
    const description = prompt("Todo's description?");
    const dueDate = prompt("Todo's due date?");
    const priority = prompt("Todo's priority?");

    const newTodo = new CreateTodo(title, description, dueDate, priority);

    todoData[target].push(newTodo);

    storeTodoToLocal();
}

const handleCreateProject = () => {
    const title = prompt("Project's title?");

    if(!title) return;

    todoData[title] = [];

    storeTodoToLocal();
}

const logTargetTodoData = () => {
    const target = prompt("Target?");

    if(!target) return;

    if(!todoData.hasOwnProperty(target)) {
        alert(`There's no ${target} in the Todo Data!`);
        return;
    }

    todoData[target].forEach((todo) => {
        console.table(todo);
    });
}

const changeTodoPropVal = () => {
    const target = prompt("Target?");
    const idx = +prompt("Todo index?");
    const prop = prompt("Todo property?");

    if(!target || !prop) return;

    if(typeof idx === "string" || idx === undefined) return;

    if(!todoData.hasOwnProperty(target)) {
        alert(`There's no ${target} in the Todo Data!`);
        return;
    }

    if(idx > target.length - 1) return;

    if(!todoData[target][idx].hasOwnProperty(prop)) {
        alert(`There's no ${prop} in the ${target}!`);
        return;
    }

    const newPropVal = prompt(`New ${prop} value?`);

    todoData[target][idx][prop] = newPropVal;

    storeTodoToLocal();
}

const markTodoCompleted = () => {
    const target = prompt("Target?");
    const idx = +prompt("Todo index?");

    if(!target) return;

    if(!todoData.hasOwnProperty(target)) {
        alert(`There's no ${target} in the Todo Data!`);
        return;
    }

    if(typeof idx === "string" || idx === undefined) return;

    todoData[target][idx]["completed"] = true;

    storeTodoToLocal();
}

const removeTodo = () => {
    const project = prompt("Project?");
    const idx = +prompt("Todo index?");

    if(!project) return;

    if(!todoData.hasOwnProperty(project)) {
        alert(`There's no ${project} in the Todo Data!`);
        return;
    }

    if(typeof idx === "string" || idx === undefined) return;

    todoData[project].splice(idx, 1);

    storeTodoToLocal();
}

const removeProject = () => {
    const project = prompt("Project?");

    if(!project) return;

    if(!todoData.hasOwnProperty(project)) {
        alert(`There's no ${project} in the Todo Data!`);
        return;
    }

    delete todoData[project];
    
    storeTodoToLocal();
}

const storeTodoToLocal = () => {
    const todoDataSerialized = JSON.stringify(todoData);
    localStorage.setItem("todoData", todoDataSerialized);
}

// Display Todo

const body = document.querySelector("body");

const displayTodo = () => {
    for(let key in todoData) {
        const ul = document.createElement("ul");
        ul.textContent = key;

        if(todoData[key]) {
            todoData[key].forEach((items) => {
                for(let item in items) {
                    const li = document.createElement("li");
                    li.textContent = items[item];
                    ul.appendChild(li);
                }
            });
        }

        body.appendChild(ul);
    }
}
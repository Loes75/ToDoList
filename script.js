//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//Functions

function addTodo(e) {
    event.preventDefault();
    //To do Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // element inside div
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    ///Add to localstorage
    saveLocalTodo(todoInput.value);
    //check button
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = ' <i class = "fas fa-check"></i>';
    todoDiv.appendChild(checkButton);
    ///delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = ' <i class = "fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    ////add div to todo-list

    todoList.appendChild(todoDiv);

    //clear input value

    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;
    //Delete todo
    if (item.classList[0] === 'delete-btn') {
        const itemParent = item.parentElement;
        itemParent.classList.add("fall");
        removeLocalStorage(itemParent);
        itemParent.addEventListener("transitionend", () => {
            itemParent.remove();
            
        })
    }
    if (item.classList[0] === 'check-btn') {
        const itemParent = item.parentElement;
        itemParent.classList.toggle("completed");

    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            default:
                break;

        }
    });
}
function getLocal(){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}
function saveLocalTodo(todo) {
    todos=getLocal();

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos() {
    todos=getLocal();
    todos.forEach(function (todo) {
        //To do Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // element inside div
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        //check button
        const checkButton = document.createElement("button");
        checkButton.classList.add("check-btn");
        checkButton.innerHTML = ' <i class = "fas fa-check"></i>';
        todoDiv.appendChild(checkButton);
        ///delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = ' <i class = "fas fa-trash"></i>';
        todoDiv.appendChild(deleteButton);

        ////add div to todo-list

        todoList.appendChild(todoDiv);
    });
}

function removeLocalStorage(todo){
    todos=getLocal();
    const todoIndex= Array.from(todoList.childNodes).indexOf(todo);
    todos.splice(todoIndex,1);
    localStorage.setItem('todos', JSON.stringify(todos));

}


const text = document.getElementById("taskAdd");
const addTaskButton = document.getElementById("addTaskBtn");
const saveTaskButton = document.getElementById("editTodoBtn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

let todoArray = [];

// TO call the displayTodo method before loading the data to html page
window.onload = displayTodo;

addTaskButton.onclick = (e) => {
  //e.preventDefault();
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  todoArray.push(text.value);
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
};

function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='savelist'>
    <p class='todolist'>${list}</p>
    <button onclick='edit(${ind})' class='editbut'>Edit</button>
    <button onclick='deleteTodo(${ind})' class='deletebut'>Delete</button>
   </div>`;
  });
  listBox.innerHTML = htmlCode;
}

function deleteTodo(ind) {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  todoArray.splice(ind, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}

function edit(ind) {
  saveInd.value = ind;
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  text.value = todoArray[ind];
  addTaskButton.style.display = "none";
  saveTaskButton.style.display = "block";
}

saveTaskButton.onclick = () => {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  let id = saveInd.value;
  todoArray[id] = text.value;
  addTaskButton.style.display = "block";
  saveTaskButton.style.display = "none";
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
};

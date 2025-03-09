let addButton = document.querySelector("#add-task-btn");
let inputField = document.querySelector("#task-input");
let taskList = document.querySelector("#task-list");

addButton.addEventListener("click", () => {
  let input = inputField.value;
  if (input === "") return;
  let li = create_li(input);
  taskList.appendChild(li);
  inputField.value = "";
  saveTasks();
});

const create_li = function (input) {
  let li = document.createElement("li");
  li.innerHTML = `
          <span>${input}</span>
          <div>
              <button class="done">Done</button>
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
          </div>`;

  let doneBTN = li.querySelector(".done");
  let deleteBTN = li.querySelector(".delete");
  let editBTN = li.querySelector(".edit");
  doneBTN.addEventListener("click", () => done_task(li));
  deleteBTN.addEventListener("click", () => delete_task(li));
  editBTN.addEventListener("click", () => edit_task(li));
  return li;
};
const done_task = function (li) {
  li.classList.toggle("done");
  saveTasks();
};
const edit_task = function (li) {
  let newInputField = prompt("Edit:", li.querySelector("span").textContent);
  if (newInputField) {
    li.querySelector("span").textContent = newInputField;
  }
  saveTasks();
};
const delete_task = function (li) {
  if (window.confirm("Are you sure you wanna delete this task?")) {
    taskList.removeChild(li);
    saveTasks();
  } else return;
};
function saveTasks() {
  localStorage.setItem("task", taskList.innerHTML);
}
function showTasks() {
  let tasks = localStorage.getItem("task");
  if (tasks) {
    taskList.innerHTML = tasks;
    reattach_eventListeners();
  }
}
const reattach_eventListeners = function () {
  let doneBTNs = document.querySelectorAll(".done");
  let deleteBTNs = document.querySelectorAll(".delete");
  let editBTNs = document.querySelectorAll(".edit");

  doneBTNs.forEach((btn) => {
    btn.addEventListener("click", () => {
      let li = btn.closest("li"); //The closest ancestor Element or itself, which matches the selectors. If there are no such element, null.
      done_task(li);
    });
  });

  deleteBTNs.forEach((btn) => {
    btn.addEventListener("click", () => {
      let li = btn.closest("li");
      delete_task(li);
    });
  });

  editBTNs.forEach((btn) => {
    btn.addEventListener("click", () => {
      let li = btn.closest("li");
      edit_task(li);
    });
  });
};
showTasks();
//localStorage.clear();

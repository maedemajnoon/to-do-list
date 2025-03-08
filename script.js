let addButton = document.querySelector("#add-task-btn");
let inputField = document.querySelector("#task-input");
let taskList = document.querySelector("#task-list");

addButton.addEventListener("click", () => {
  let input = inputField.value;
  if (input === "") return;
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

  doneBTN.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  deleteBTN.addEventListener("click", () => {
    if (window.confirm("Are you sure you wanna delete this task?")) {
      taskList.removeChild(li);
      saveTasks();
    } else return;
  });

  editBTN.addEventListener("click", () => {
    let newInputField = prompt("Edit:", li.querySelector("span").textContent);
    if (newInputField) {
      li.querySelector("span").textContent = newInputField;
    }
    saveTasks();
  });

  taskList.appendChild(li);
  inputField.value = "";
  saveTasks();
});
function saveTasks() {
  localStorage.setItem("task", taskList.innerHTML);
}
function showTasks() {
  let tasks = localStorage.getItem("task");
  if (tasks) {
    taskList.innerHTML = tasks;
    let doneBTNs = document.querySelectorAll(".done");
    let deleteBTNs = document.querySelectorAll(".delete");
    let editBTNs = document.querySelectorAll(".edit");

    doneBTNs.forEach((btn) => {
      btn.addEventListener("click", () => {
        let li = btn.closest("li"); //The closest ancestor Element or itself, which matches the selectors. If there are no such element, null.
        li.classList.toggle("done");
      });
    });

    deleteBTNs.forEach((btn) => {
      btn.addEventListener("click", () => {
        let li = btn.closest("li");
        if (window.confirm("Are you sure you wanna delete this task?")) {
          taskList.removeChild(li);
          saveTasks();
        } else return;
      });
    });

    editBTNs.forEach((btn) => {
      btn.addEventListener("click", () => {
        let li = btn.closest("li");
        let newInputField = prompt(
          "Edit:",
          li.querySelector("span").textContent
        );
        if (newInputField) {
          li.querySelector("span").textContent = newInputField;
        }
      });
    });
  }
}
showTasks();
//localStorage.clear();

let addButton = document.querySelector("#add-task-btn");
let inputField = document.querySelector("#task-input");
let taskList = document.querySelector("#task-list");

addButton.addEventListener("click", () => {
  //console.log("add task");
  let input = inputField.value;
  //console.log(input);
  if (input === "") return;
  let li = document.createElement("li");
  li.innerHTML = `
          <span>${input}</span>
          <div>
              <button class="done">Done</button>
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
          </div>`;
  //saveTasks();
  let doneBTN = li.querySelector(".done");
  let deleteBTN = li.querySelector(".delete");
  let editBTN = li.querySelector(".edit");

  doneBTN.addEventListener("click", () => {
    li.classList.toggle("done");
    //saveTasks();
  });

  deleteBTN.addEventListener("click", () => {
    taskList.removeChild(li);
    //saveTasks();
  });

  editBTN.addEventListener("click", () => {
    let newInputField = prompt("Edit:", li.querySelector("span").textContent);
    if (newInputField) {
      li.querySelector("span").textContent = newInputField;
    }
    //saveTasks();
  });

  taskList.appendChild(li);
  inputField.value = "";
  saveTasks();
});
function saveTasks() {
  localStorage.setItem("task", taskList.innerHTML);
}
function showTasks() {
  taskList.innerHTML = localStorage.getItem("task");
}
showTasks();
//localStorage.clear();

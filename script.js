const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = document.createElement("li");
    const doneButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    li.textContent = task.text;
    deleteButton.textContent = "Delete";
    doneButton.textContent = "Done";

    if (task.completed) {
      li.classList.add("completed");
    }

    taskList.appendChild(li);
    taskList.appendChild(deleteButton);
    taskList.appendChild(doneButton);

    doneButton.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    deleteButton.addEventListener("click", () => {
      li.remove();
      deleteButton.remove();
      doneButton.remove();
      saveTasks();
    });
  });
}

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim(); // Trim the value of taskInput
  if (taskText) {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    const doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    deleteButton.textContent = "Delete";
    li.textContent = taskText;
    // Append
    taskList.appendChild(li);
    taskList.appendChild(deleteButton);
    taskList.appendChild(doneButton);

    doneButton.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });
    deleteButton.addEventListener("click", () => {
      li.remove();
      deleteButton.remove();
      doneButton.remove();
      saveTasks();
    });
    taskInput.value = "";
    saveTasks();
  } else {
    alert("Please enter a task");
  }
});
loadTasks();

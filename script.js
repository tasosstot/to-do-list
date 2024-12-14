const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Function to get the current time and date
function getCurrentTimeDate() {
  const now = new Date();
  const [hours, minutes, seconds, day, month] = [
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getDate(),
    now.getMonth() + 1,
  ];
  return `Time:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}   Date:${day}/${month.toString().padStart(2, "0")}`;
}

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("div.task-item").forEach(taskDiv => {
    const li = taskDiv.querySelector("li");
    const timedate = taskDiv.querySelector("p");
    tasks.push({
      text: li.textContent, // Save only the task text
      time: timedate.textContent, // Save the time separately
      completed: li.classList.contains("completed"), // Track completed status
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");

    const li = document.createElement("li");
    const doneButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const timedate = document.createElement("p");

    li.textContent = task.text; // Set task text
    timedate.textContent = task.time; // Set saved time
    deleteButton.textContent = "Delete";
    doneButton.textContent = "Done";
    deleteButton.classList.add("btn-del");

    if (task.completed) {
      li.classList.add("completed");
      timedate.classList.add("completed");
    }

    // Append elements to the taskDiv
    taskDiv.appendChild(li); // Append task text
    taskDiv.appendChild(timedate); // Append time
    taskDiv.appendChild(doneButton);
    taskDiv.appendChild(deleteButton);
    taskList.appendChild(taskDiv);

    // Event listeners for buttons
    doneButton.addEventListener("click", () => {
      li.classList.toggle("completed");
      timedate.classList.toggle("completed");
      saveTasks();
    });

    deleteButton.addEventListener("click", () => {
      taskDiv.remove();
      saveTasks();
    });
  });
}

// Add task button functionality
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");

    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    const doneButton = document.createElement("button");
    const timedate = document.createElement("p");

    li.textContent = taskText; // Set task text
    timedate.textContent = getCurrentTimeDate(); // Set current time and date
    deleteButton.textContent = "Delete";
    doneButton.textContent = "Done";
    deleteButton.classList.add("btn-del");

    // Append elements to the taskDiv
    taskDiv.appendChild(li);
    taskDiv.appendChild(timedate);
    taskDiv.appendChild(doneButton);
    taskDiv.appendChild(deleteButton);
    taskList.appendChild(taskDiv);

    // Event listeners for buttons
    doneButton.addEventListener("click", () => {
      li.classList.toggle("completed");
      timedate.classList.toggle("completed");
      saveTasks();
    });

    deleteButton.addEventListener("click", () => {
      taskDiv.remove();
      saveTasks();
    });

    // Clear input and save task
    taskInput.value = "";
    saveTasks();
  } else {
    alert("Please enter a task");
  }
});

// Load tasks on page load
loadTasks();

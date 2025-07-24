document.getElementById("additem").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("itemname").value.trim();
  const date = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;

  if (!name || !date || !priority) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    name,
    date,
    priority,
    completed: false
  };

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
  clearInputs();
});

function displayTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const today = new Date().toISOString().split("T")[0];

  document.getElementById("todayDate").textContent = today;
  document.getElementById("todayTasks").innerHTML = "";
  document.getElementById("futureTasks").innerHTML = "";
  document.getElementById("completedTasks").innerHTML = "";

  tasks.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task" + (task.completed ? " completed" : "");
    taskEl.innerHTML = `
      <div>
        <strong>${task.name}</strong> (${task.date}) [${task.priority}]
      </div>
      <div>
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "✓"}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    if (task.completed) {
      document.getElementById("completedTasks").appendChild(taskEl);
    } else if (task.date === today) {
      document.getElementById("todayTasks").appendChild(taskEl);
    } else {
      document.getElementById("futureTasks").appendChild(taskEl);
    }
  });
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function toggleComplete(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function clearInputs() {
  document.getElementById("itemname").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("priority").value = "";
}

// Initial render
displayTasks();

const BASE_URL = "https://api.freeschema.com";
const APP_ID = "YOUR_APP_ID";
const API_KEY = "YOUR_API_KEY";
const COLLECTION = "tasks";

// Load tasks on start
window.onload = fetchTasks;

// ✅ CREATE TASK
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value;

  if (!task) return;

  fetch(`${BASE_URL}/data/${COLLECTION}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": APP_ID,
      "x-api-key": API_KEY
    },
    body: JSON.stringify({ title: task })
  })
    .then(res => res.json())
    .then(() => {
      input.value = "";
      fetchTasks();
    });
}

// ✅ READ TASKS
function fetchTasks() {
  fetch(`${BASE_URL}/data/${COLLECTION}`, {
    headers: {
      "x-app-id": APP_ID,
      "x-api-key": API_KEY
    }
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      data.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
          <span>${task.title}</span>
          <div>
            <button class="edit" onclick="editTask('${task._id}', '${task.title}')">Edit</button>
            <button class="delete" onclick="deleteTask('${task._id}')">Delete</button>
          </div>
        `;

        list.appendChild(li);
      });
    });
}

// ✅ UPDATE TASK
function editTask(id, oldTitle) {
  const newTitle = prompt("Edit Task:", oldTitle);

  if (!newTitle) return;

  fetch(`${BASE_URL}/data/${COLLECTION}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": APP_ID,
      "x-api-key": API_KEY
    },
    body: JSON.stringify({ title: newTitle })
  }).then(fetchTasks);
}

// ✅ DELETE TASK
function deleteTask(id) {
  fetch(`${BASE_URL}/data/${COLLECTION}/${id}`, {
    method: "DELETE",
    headers: {
      "x-app-id": APP_ID,
      "x-api-key": API_KEY
    }
  }).then(fetchTasks);
}
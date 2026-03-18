const API_URL = "http://localhost:8080/tasks";

// ADD
function addTask() {
    const title = document.getElementById("title").value;
    const status = document.getElementById("status").value;

    fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ title, status })
    })
    .then(() => alert("Task Added"));
}

// GET
function fetchTasks() {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById("taskList");
        list.innerHTML = "";

        data.forEach(task => {
            const li = document.createElement("li");

            li.innerHTML = `
                ${task.title} - ${task.status}
                <button onclick="editTask(${task.id}, '${task.title}', '${task.status}')">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;

            list.appendChild(li);
        });
    });
}

// EDIT
function editTask(id, title, status) {
    document.getElementById("editSection").style.display = "block";
    document.getElementById("editId").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editStatus").value = status;
}

// UPDATE
function updateTask() {
    const id = document.getElementById("editId").value;
    const title = document.getElementById("editTitle").value;
    const status = document.getElementById("editStatus").value;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ title, status })
    })
    .then(() => {
        alert("Updated");
        fetchTasks();
    });
}

// DELETE (button)
function deleteTask(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => fetchTasks());
}

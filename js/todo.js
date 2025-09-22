let tasks = []; 
let idCounter = 1;



document.addEventListener('DOMContentLoaded', async function() {
    // Verifica autenticación
    if (typeof checkAuthentication === "function" && !checkAuthentication()) {
        window.location.href = 'login.html';
        return;
    }

    async function fetchExternalTodos() {
        try {
            const res = await fetch("https://dummyjson.com/c/28e8-a101-4223-a35c");
            const data = await res.json();
            tasks.push(...data); 
            renderTasks();
        } catch (error) {
            console.error("Error al obtener todos externos:", error);
        }
    }

    setupEventListeners();
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
    }

    if (!localStorage.getItem("fetched")) {
        await fetchExternalTodos();
        localStorage.setItem("fetched", "true");
    }
     if (tasks.length > 0) {
        idCounter = Math.max(...tasks.map(t => t.id)) + 1;
    }
    renderTasks();
});

// Configurar eventos
function setupEventListeners() {
    // botón de logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (typeof logout === "function") {
                logout();
            }
        });
    }

    // botón de agregar tarea
    document.getElementById("addBtn").addEventListener("click", () => {
        const input = document.getElementById("taskInput");
        if (input.value.trim()) {
            createTask(input.value.trim());
            input.value = "";
        }
    });
}

// Crear tarea
function createTask(text) {
  if (!validarTexto(text)) return;
  const now = Date.now();
  const task = {
    id: idCounter++,
    text,
    done: false,
    createdAt: now,
    updatedAt: now
  };
  tasks.unshift(task);
  renderTasks();
}


// Renderizar tareas
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.sort((a, b) => b.createdAt - a.createdAt);

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${task.done ? "line-through" : "none"}">
        ${task.text}
      </span>
      <div class="btn-group">
        <button class="done-btn" onclick="toggleDone(${task.id})">✔</button>
        <button class="edit-btn" onclick="editTask(${task.id})">✏️</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}




function validarTexto(text) {
  if (!text.trim() || /^\d+$/.test(text)) {
    alert("El texto no puede estar vacío ni ser solo números");
    return false;
  }

  if (text.trim().length < 10) {
    alert("La tarea debe tener mínimo 10 caracteres");
    return false;
  }

  if (tasks.some(t => t.text.toLowerCase() === text.toLowerCase())) {
    alert("La tarea ya existe");
    return false;
  }

  return true;
}

// Actualizar estado
function toggleDone(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    task.updatedAt = Date.now();
    renderTasks();
  }
}

function editTask(id) {
  const newText = prompt("Nuevo texto:");
  if (!validarTexto(newText)) return;
  const task = tasks.find(t => t.id === id);
  if (task && newText) {
    task.text = newText;
    task.updatedAt = Date.now();
    renderTasks();
  }
}

// Eliminar
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

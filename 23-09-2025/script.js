// ================================
// To-Do List App with Time & Tick
// ================================

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalCount = document.getElementById('total-count');
const pendingCount = document.getElementById('pending-count');
const completedCount = document.getElementById('completed-count');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add task
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    alert('Please enter a task!');
    return;
  }

  const task = { 
    id: Date.now(), 
    text, 
    completed: false, 
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
  };

  tasks.push(task);
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

// Render tasks
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  let filteredTasks = tasks;

  if (filter === 'pending') {
    filteredTasks = tasks.filter(t => !t.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(t => t.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <div class="task-info">
        <span class="task-text">${task.text}</span>
        <span class="task-time">Added at: ${task.time}</span>
      </div>
      <div class="task-actions">
        <button class="tick-btn">✔</button>
        <button class="edit-btn">Edit</button>
        <button class="remove-btn">X</button>
      </div>
    `;

    // Tick button to complete
    li.querySelector('.tick-btn').addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks(filter);
    });

    // Edit task
    li.querySelector('.edit-btn').addEventListener('click', () => {
      const newText = prompt('Edit task:', task.text);
      if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasks();
        renderTasks(filter);
      }
    });

    // Remove task
    li.querySelector('.remove-btn').addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks(filter);
    });

    taskList.appendChild(li);
  });

  updateCounters();
}

// Update counters
function updateCounters() {
  totalCount.textContent = tasks.length;
  pendingCount.textContent = tasks.filter(t => !t.completed).length;
  completedCount.textContent = tasks.filter(t => t.completed).length;
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all
clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all tasks?')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// Filters
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    renderTasks(btn.dataset.filter);
  });
});

// Display date
document.getElementById('date').textContent =
  new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

// Initial render
renderTasks();

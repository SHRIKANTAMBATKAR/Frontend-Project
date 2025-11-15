/* Todo App - A simple and elegant todo list application */

// Creating an empty array to store todos
let demoarray = [];

// Function for rendering the todo items
function renderTodo(todo) {
  // Save todos to localStorage
  localStorage.setItem("demoarray", JSON.stringify(demoarray));

  // Select unordered list using class
  const list = document.querySelector(".todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    if (item) item.remove();
    return;
  }

  // Check if checked is true, add done class effect, otherwise as it is
  const isChecked = todo.checked ? "done" : "";
  // Create a new list item
  const newlist = document.createElement("li");
  // Set attributes to new list item
  newlist.setAttribute("class", `todo-item ${isChecked}`);
  newlist.setAttribute("data-key", todo.id);
  newlist.innerHTML = `
<input id="${todo.id}" type="checkbox" />
<label for="${todo.id}" class="tick js-tick"></label>
<span class="todo-text">${escapeHtml(todo.text)}</span>
<button class="delete-todo js-delete-todo" title="Delete todo" aria-label="Delete todo">
    <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
</button>
`;

  if (item) {
    list.replaceChild(newlist, item);
  } else {
    list.append(newlist);
  }
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Function for adding a todo
function addTodo(text) {
  // Create a todo object
  const todoobject = {
    text: text.trim(),
    checked: false,
    id: Date.now(),
  };

  // Push new todo into the demoarray
  demoarray.push(todoobject);
  renderTodo(todoobject);
}

// Function to toggle todo completion status
function toggleDone(id) {
  const index = demoarray.findIndex((item) => item.id === Number(id));
  if (index !== -1) {
    demoarray[index].checked = !demoarray[index].checked;
    renderTodo(demoarray[index]);
  }
}

// Function to delete a todo
function deleteTodo(id) {
  const index = demoarray.findIndex((item) => item.id === Number(id));
  if (index !== -1) {
    const deletedTodo = {
      deleted: true,
      ...demoarray[index],
    };
    demoarray = demoarray.filter((item) => item.id !== Number(id));
    renderTodo(deletedTodo);
  }
}

// Select form
const form = document.querySelector(".formselect");

// Add event listener for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Select input field
  const input = document.querySelector(".inputselect");

  // Remove whitespace from input value
  const text = input.value.trim();

  // Check if input is not empty
  if (text !== "") {
    // Add new todo
    addTodo(text);
    // Clear input field
    input.value = "";
    // Focus input for better UX
    input.focus();
  } else {
    // Show a subtle alert if empty
    input.placeholder = "Please enter a todo!";
    setTimeout(() => {
      input.placeholder = "Eg: Workout";
    }, 2000);
  }
});

// Select entire todo list
const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
  const todoItem = event.target.closest(".todo-item");
  if (!todoItem) return;

  const itemKey = todoItem.dataset.key;

  if (event.target.classList.contains("js-tick")) {
    toggleDone(itemKey);
  }

  if (event.target.closest(".js-delete-todo")) {
    deleteTodo(itemKey);
  }
});

// Load todos from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = localStorage.getItem("demoarray");
  if (savedTodos) {
    try {
      demoarray = JSON.parse(savedTodos);
      demoarray.forEach((todo) => {
        renderTodo(todo);
      });
    } catch (error) {
      console.error("Error loading todos:", error);
      localStorage.removeItem("demoarray");
    }
  }
  // Focus input field on load
  document.querySelector(".inputselect").focus();
});

// Theme toggle functionality
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  const theme = e.target.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

toggleSwitch.addEventListener("change", switchTheme, false);

// Keyboard shortcut: Clear all completed todos (Ctrl+Shift+C)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.code === "KeyC") {
    const completedTodos = demoarray.filter((t) => t.checked);
    completedTodos.forEach((todo) => {
      deleteTodo(todo.id);
    });
  }
});


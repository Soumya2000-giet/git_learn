interface Todo {
    id: number;
    name: string;
    dueDate: string;
    completed: boolean;
}

const taskInput = document.getElementById("taskName") as HTMLInputElement;
const dateInput = document.getElementById("dueDate") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

let todos: Todo[] = loadTodos();

function loadTodos(): Todo[] {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
}

function saveTodos(): void {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos(): void {
    taskList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        const span = document.createElement("span");
        span.textContent = `${todo.name} (Due: ${todo.dueDate})`;

        if (todo.completed) {
            span.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const name = taskInput.value.trim();
    const dueDate = dateInput.value;

    if (!name || !dueDate) {
        alert("Please enter task and due date");
        return;
    }

    const newTodo: Todo = {
        id: Date.now(),
        name,
        dueDate,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();

    taskInput.value = "";
    dateInput.value = "";
});

renderTodos();
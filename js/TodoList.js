class TodoList extends Component {
    #tasks = []; // Массив для хранения задач
    #renderer;   // Объект для рендеринга списка задач

    constructor(input) {
        super(input);
        this.#renderer = new Renderer(input); // Инициализация рендерера
        this.loadFromLocalStorage();          // Загрузка задач и темы из LocalStorage
    }

    // Настройка слушателей событий
    setupEventListeners() {
        const taskInput = this.input.querySelector("input[type='text']");
        const dateInput = this.input.querySelector("#task-date");
        const timeInput = this.input.querySelector("#task-time");
        const addButton = this.input.querySelector("button");
        const ul = this.input.querySelector(".tasks");

        // Обработчик для добавления новой задачи
        addButton.addEventListener("click", () => {
            const task = taskInput.value.trim();
            const date = dateInput.value;
            const time = timeInput.value;
            if (task !== "" && date !== "" && time !== "") {
                this.addTask(task, date, time);
                taskInput.value = "";
                dateInput.value = "";
                timeInput.value = "";
            }
        });

        // Обработчик для редактирования и удаления задач
        ul.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON") {
                const taskItem = event.target.parentElement;
                const task = taskItem.dataset.task;
                const date = taskItem.dataset.date;
                const time = taskItem.dataset.time;
                if (event.target.classList.contains("delete-btn")) {
                    this.removeTask(task, date, time); // Удаление задачи
                } else if (event.target.classList.contains("edit-btn")) {
                    const newTask = prompt("Enter new task:", task);
                    const newDate = prompt("Enter new date:", date);
                    const newTime = prompt("Enter new time:", time);
                    if (newTask !== null && newTask.trim() !== "" && newDate !== "" && newTime !== "") {
                        this.editTask(task, date, time, newTask, newDate, newTime); // Редактирование задачи
                    }
                }
            } else if (event.target.tagName === "SPAN") {
                const taskItem = event.target.parentElement;
                const task = taskItem.dataset.task;
                const date = taskItem.dataset.date;
                const time = taskItem.dataset.time;
                event.target.classList.toggle("completed");
                this.toggleTaskStatus(task, date, time); // Переключение статуса задачи (выполнена/невыполнена)
            }
        });
    }

    // Метод для добавления задачи
    addTask(taskText, date, time) {
        const task = new Task(taskText, date, time);
        this.#tasks.push(task);
        this.#renderer.renderList(this.#tasks); // Обновление отображения списка задач
        this.saveToLocalStorage();              // Сохранение задач в LocalStorage
    }

    // Метод для удаления задачи
    removeTask(taskText, date, time) {
        this.#tasks = this.#tasks.filter((task) => task.task !== taskText || task.date !== date || task.time !== time);
        this.#renderer.renderList(this.#tasks); // Обновление отображения списка задач
        this.saveToLocalStorage();              // Сохранение изменений в LocalStorage
    }

    // Метод для редактирования задачи
    editTask(oldTask, oldDate, oldTime, newTask, newDate, newTime) {
        const index = this.#tasks.findIndex((task) => task.task === oldTask && task.date === oldDate && task.time === oldTime);
        if (index !== -1) {
            this.#tasks[index].task = newTask.trim();
            this.#tasks[index].date = newDate;
            this.#tasks[index].time = newTime;
            this.#renderer.renderList(this.#tasks); // Обновление отображения списка задач
            this.saveToLocalStorage();              // Сохранение изменений в LocalStorage
        }
    }

    // Метод для переключения статуса задачи (выполнена/невыполнена)
    toggleTaskStatus(taskText, date, time) {
        const task = this.#tasks.find((task) => task.task === taskText && task.date === date && task.time === time);
        if (task) {
            task.toggleStatus();
            this.saveToLocalStorage(); // Сохранение изменений в LocalStorage
        }
    }

    // Метод для сохранения задач и темы в LocalStorage
    saveToLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.#tasks));
        localStorage.setItem("theme", document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }

    // Метод для загрузки задач и темы из LocalStorage
    loadFromLocalStorage() {
        const storedTasks = JSON.parse(localStorage.getItem("todoList"));
        if (storedTasks) {
            this.#tasks = storedTasks.map((task) => new Task(task.task, task.date, task.time, task.completed));
        }
        this.#renderer.renderList(this.#tasks); // Отображение загруженного списка задач

        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.getElementById('theme-toggle').checked = true;
        } else {
            document.body.classList.remove('dark-theme');
            document.getElementById('theme-toggle').checked = false;
        }
    }
}

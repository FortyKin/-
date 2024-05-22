class Task {
    // Конструктор для инициализации задачи
    constructor(task, date, time, completed = false) {
        this.task = task;         // Текст задачи
        this.date = date;         // Дата выполнения задачи
        this.time = time;         // Время выполнения задачи
        this.completed = completed; // Статус выполнения задачи (по умолчанию false)
    }

    // Метод для переключения статуса выполнения задачи
    toggleStatus() {
        this.completed = !this.completed;
    }
}

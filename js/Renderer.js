class Renderer {
    #input; // Приватное свойство для хранения элемента ввода

    // Конструктор для инициализации рендерера
    constructor(input) {
        this.#input = input;
    }

    // Метод для отображения списка задач
    renderList(tasks) {
        const ul = this.#input.querySelector(".tasks"); // Получаем элемент списка задач
        ul.innerHTML = ""; // Очищаем текущий список задач

        // Проходим по всем задачам и создаем элементы списка
        tasks.forEach((task, index) => {
            setTimeout(() => {
                const li = document.createElement("li"); // Создаем элемент списка
                li.dataset.task = task.task;             // Устанавливаем данные задачи
                li.dataset.date = task.date;
                li.dataset.time = task.time;

                // Создаем элемент для текста задачи
                const taskText = document.createElement("span");
                taskText.textContent = `${task.task} (${task.date} ${task.time})`; // Устанавливаем текст задачи
                if (task.completed) {
                    taskText.classList.add("completed"); // Добавляем класс "completed", если задача выполнена
                }
                li.appendChild(taskText); // Добавляем текст задачи в элемент списка

                // Создаем кнопку для редактирования задачи
                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";             // Текст кнопки
                editBtn.classList.add("edit-btn");        // Класс кнопки
                li.appendChild(editBtn);                  // Добавляем кнопку в элемент списка

                // Создаем кнопку для удаления задачи
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";         // Текст кнопки
                deleteBtn.classList.add("delete-btn");    // Класс кнопки
                li.appendChild(deleteBtn);                // Добавляем кнопку в элемент списка

                ul.appendChild(li); // Добавляем элемент списка в ul
            }, index * 100); // Добавляем задержку для анимации (100 мс на элемент)
        });
    }
}

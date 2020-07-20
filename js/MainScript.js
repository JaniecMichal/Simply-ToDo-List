{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = (newTaskContainer) => {
        tasks = [
            ...tasks,
            { content: newTaskContainer, done: false },
        ];

        render();
        taskInputCleaning();
        taskInputFocus();
    };

    const taskInputCleaning = () => {
        document.querySelector(".form__input").value = "";
    };

    const taskInputFocus = () => {
        document.querySelector(".form__input").focus();
    };

    const removeTask = (removedIndex) => {
        tasks = [
            ...tasks.slice(0, removedIndex),
            ...tasks.slice(removedIndex + 1),
        ];
        render();
    };

    const toggleDone = (editedTaskIndex) => {
        tasks = [
            ...tasks.slice(0, editedTaskIndex),
            { ...tasks[editedTaskIndex], done: !tasks[editedTaskIndex].done },
            ...tasks.slice(editedTaskIndex + 1),
        ];
        render();
    };

    const markAllDone = () => {
        if (tasks.length > 0) {
            tasks = tasks.map(task => ({
                ...task, done: true,
            }));
        }
        render();
    };

    const hidingDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    }

    const bindsRemoveEvent = () => {
        const removeButtons = document.querySelectorAll(".taskList__button--remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        });
    };

    const bindsToggleDoneEvent = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-doneButton");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleDone(index);
            })
        });
    };

    const removeAllTasks = () => {
        tasks = [];

        render();
    };

    const renderTask = () => {
        const tasksToHTML = tasks.map(task => `
        <li 
        class="taskList__listItem ${hideDoneTask && task.done ? "taskList__listItem--hidden" : ""}
        "> 
        <button class="taskList__button js-doneButton 
        ${task.done ? "taskList__button--done" : ""}">
        </button>
        <p class="taskList__task 
        ${task.done ? "taskList__task--done" : ""}">${task.content}
        </p>
        <button class="taskList__button taskList__button--remove">
        </button>
         </li>`).join(" ");

        document.querySelector(".taskList").innerHTML = tasksToHTML;
    };

    const renderAdditionalButtons = () => {
        const buttonsContainer = document.querySelector(".buttonContainer")

        if (tasks.length > 0) {
            buttonsContainer.innerHTML =
                `<button class="taskList__button taskList__button--additionalAction js-allDoneButton" 
            ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Oznacz wszystkie jako ukończone
            </button>
            <button class="taskList__button taskList__button--additionalAction js-hideDoneTask">
            ${hideDoneTask ? "Pokaż wykonane zadania" : "Ukryj wykonane zadania"}</button>
            <button class="taskList__button taskList__button--allRemove">
            Usuń wszystkie zadania
            </button>`
        }
        else {
            buttonsContainer.innerHTML = "";
        }
    }

    const bindsAllDoneEvent = () => {
        if (tasks.length > 0) {
            const allDonebutton = document.querySelector(".js-allDoneButton");
            allDonebutton.addEventListener("click", markAllDone);
        };
    };

    const bindsHideDoneEvent = () => {
        if (tasks.length > 0) {
            const hideDoneTaskButton = document.querySelector(".js-hideDoneTask");
            hideDoneTaskButton.addEventListener("click", hidingDoneTask);
        };
    };

    const bindsRemoveAllEvent = () => {
        if (tasks.length > 0) {
            const removeAllTaskButton = document.querySelector(".taskList__button--allRemove");
            removeAllTaskButton.addEventListener("click", removeAllTasks);
        };
    };

    const render = () => {

        renderTask();
        renderAdditionalButtons();
        bindsRemoveEvent();
        bindsToggleDoneEvent();
        bindsAllDoneEvent();
        bindsHideDoneEvent();
        bindsRemoveAllEvent();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContainer = document.querySelector(".form__input").value.trim();

        if (newTaskContainer === "") {
            return taskInputFocus();
        };
        addNewTask(newTaskContainer);
    };

    const init = () => {

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        render();

    };
    init();
}
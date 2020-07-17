{
    let tasks = [];
    let hideDoneTask = false;
    let anyTasks = false;

    const checkingQuantityDoneTask = () => {
        tasks.length === 0 ? anyTasks = false : "";
    }

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
        document.querySelector(".taskAddingPanel__input").value = "";
    };

    const taskInputFocus = () => {
        document.querySelector(".taskAddingPanel__input").focus();
    };

    const removeTask = (removedIndex) => {
        tasks = [
            ...tasks.slice(0, removedIndex),
            ...tasks.slice(removedIndex + 1),
        ];
        checkingQuantityDoneTask();
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
        anyTasks = true;
        render();
    };

    const hidingDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    }

    const bindsRemoveEvent = () => {
        const removeButtons = document.querySelectorAll(".taskListToDoPanel__button--remove");

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
        checkingQuantityDoneTask();
        render();
    };

    const renderTask = () => {
        const tasksToHTML = tasks.map(task => `
        <li class="taskListToDoPanel__listItem ${hideDoneTask && task.done ? "taskListToDoPanel__listItem--hidden" : ""}"> <button class="taskListToDoPanel__button js-doneButton 
        ${task.done ? "taskListToDoPanel__button--done" : ""}"></button>
        <p class="taskListToDoPanel__task ${task.done ? "taskListToDoPanel__task--done" : ""}">${task.content}</p><button
            class="taskListToDoPanel__button taskListToDoPanel__button--remove"></button>
         </li>`).join(" ");

        document.querySelector(".taskListToDoPanel__taskList").innerHTML = tasksToHTML;
    };

    const renderAdditionalButtons = () => {
        const buttonsContainer = document.querySelector(".taskListToDoPanel__buttonContainer")

        if (tasks.length > 0) {
            buttonsContainer.innerHTML =
                `<button class="taskListToDoPanel__button taskListToDoPanel__button--additionalAction ${anyTasks ? "taskListToDoPanel__button--disabled disabled" : ""} js-allDoneButton">Oznacz wszystkie jako ukończone</button>
        <button class="taskListToDoPanel__button taskListToDoPanel__button--additionalAction js-hideDoneTask">${hideDoneTask ? "Pokaż wykonane zadania" : "Ukryj wykonane zadania"}</button>
        <button class="taskListToDoPanel__button taskListToDoPanel__button--allRemove">Usuń wszystkie
        zadania</button>`
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
            const removeAllTaskButton = document.querySelector(".taskListToDoPanel__button--allRemove");
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
        const newTaskContainer = document.querySelector(".taskAddingPanel__input").value.trim();

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
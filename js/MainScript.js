{
    let tasks = [

    ];

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

    const bindsEvents = () => {
        const removeButtons = document.querySelectorAll(".taskListToDoPanel__button--remove");


        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        });

        const toggleDoneButtons = document.querySelectorAll(".js-doneButton");


        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleDone(index);
            })
        });
    };

    const renderTask = () => {
        let HTMLstring = "";

        for (const task of tasks) {
            HTMLstring += `
            <li class="taskListToDoPanel__listItem"> <button class="taskListToDoPanel__button js-doneButton 
            ${task.done ? "taskListToDoPanel__button--done" : ""}"></button>
            <p class="taskListToDoPanel__task ${task.done ? "taskListToDoPanel__task--done" : ""}">${task.content}</p><button
                class="taskListToDoPanel__button taskListToDoPanel__button--remove"></button>
             </li>
            `;
        }
        document.querySelector(".taskListToDoPanel__taskList").innerHTML = HTMLstring;
    };

    const renderAdditionalButtons = () => {
        const buttonsContainer = document.querySelector(".taskListToDoPanel__buttonContainer")

        if (tasks.length > 0) {
            buttonsContainer.innerHTML = ` 
        <button class="taskListToDoPanel__button taskListToDoPanel__button--additionalAction js-allDoneButton">Oznacz wszystkie jako ukończone</button>
        <button class="taskListToDoPanel__button taskListToDoPanel__button--additionalAction js-hideDoneTask">Ukryj ukończone</button>`
        }
        else {
            buttonsContainer.innerHTML = "";
        }
    }

    const bindsAdditionalEvents = () => {
        if (tasks.length > 0) {
            const allDonebutton = document.querySelector(".js-allDoneButton");
            allDonebutton.addEventListener("click", markAllDone);
        };


    };

    const render = () => {

        renderTask();
        renderAdditionalButtons();
        bindsEvents();
        bindsAdditionalEvents();


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
{
    const tasks = [

    ];

    const addNewTask = (newTaskContainer) => {
        tasks.push({
            content: newTaskContainer,
            done: false,
        })
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

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
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

    const render = () => {
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

        bindsEvents();

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
{
    const tasks = [

    ];

    const addNewTask = (NewTaskContainer) => {
        tasks.push({
            content: NewTaskContainer,
            done: false,
        })
        render();
        taskInputCleaning();
        taskInputFocus();
    };

    const taskInputCleaning = () => {
        document.querySelector(".TaskAddingPanel_Input").value = "";
    };

    const taskInputFocus = () => {
        document.querySelector(".TaskAddingPanel_Input").focus();
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
        const RemoveButtons = document.querySelectorAll(".TaskListToDoPanel__Button--remove");


        RemoveButtons.forEach((RemoveButton, index) => {
            RemoveButton.addEventListener("click", () => {
                removeTask(index);
            })
        });

        const ToggleDoneButtons = document.querySelectorAll(".js-doneButton");


        ToggleDoneButtons.forEach((ToggleDoneButton, index) => {
            ToggleDoneButton.addEventListener("click", () => {
                toggleDone(index);
            })
        });
    };

    const render = () => {
        let HTMLstring = "";

        for (const task of tasks) {
            HTMLstring += `
            <li class="TaskListToDoPanel__ListItem"> <button class="TaskListToDoPanel__Button js-doneButton 
            ${task.done ? "TaskListToDoPanel__Button--done" : ""}"></button>
            <p class="TaskListToDoPanel__Task ${task.done ? "TaskListToDoPanel__Task--done" : ""}">${task.content}</p><button
                class="TaskListToDoPanel__Button TaskListToDoPanel__Button--remove"></button>
             </li>
            `;
        }
        document.querySelector(".TaskListToDoPanel__TaskList").innerHTML = HTMLstring;

        bindsEvents();

    };

    const OnFormSubmit = (event) => {
        event.preventDefault();
        const NewTaskContainer = document.querySelector(".TaskAddingPanel_Input").value.trim();

        if (NewTaskContainer === "") {
            taskInputFocus();
        };
        addNewTask(NewTaskContainer);
    };

    const init = () => {

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", OnFormSubmit);
        render();

    };
    init();
}
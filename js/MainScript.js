{
    const tasks = [
        {
            content: "Obejrzeć film Misja",
            done: false,
        },
        {
            content: "Pobawić się z Domisiem",
            done: true,
        },
    ];

    const addNewTask = (NewTaskContainer) => {
        tasks.push({
            content: NewTaskContainer,
            done: false,
        })
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const render = () => {
        let HTMLstring = "";

        for (const task of tasks) {
            HTMLstring += `
            <li class="TaskListToDoPanel__ListItem"> <button class="TaskListToDoPanel__Button js-doneButton ${task.done ? "TaskListToDoPanel__Button--done" : ""}"></button>
            <p class="TaskListToDoPanel__Task ${task.done ? "TaskListToDoPanel__Task--done" : ""}">${task.content}</p><button
                class="TaskListToDoPanel__Button TaskListToDoPanel__Button--remove"></button>
             </li>
            `;
        }
        document.querySelector(".TaskListToDoPanel__TaskList").innerHTML = HTMLstring;

        const RemoveButtons = document.querySelectorAll(".TaskListToDoPanel__Button--remove");


        RemoveButtons.forEach((RemoveButton, index) => {
            RemoveButton.addEventListener("click", () => {
                removeTask(index);
            })
        });

        const RemoveButtons = document.querySelectorAll(".TaskListToDoPanel__Button--remove");


        RemoveButtons.forEach((RemoveButton, index) => {
            RemoveButton.addEventListener("click", () => {
                removeTask(index);
            })
        });

    };

    const OnFormSubmit = (event) => {
        event.preventDefault();
        const NewTaskContainer = document.querySelector(".TaskAddingPanel_Input").value.trim();

        if (NewTaskContainer === "") {
            return;
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
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

    const render = () => {
        let HTMLstring = "";

        for (const task of tasks) {
            HTMLstring += `
            <li class="TaskListToDoPanel__ListItem"> <button class="TaskListToDoPanel__Button ${task.done ? "TaskListToDoPanel__Button--done" : ""}"></button>
            <p class="TaskListToDoPanel__Task ${task.done ? "TaskListToDoPanel__Task--done" : ""}">${task.content}</p><button
                class="TaskListToDoPanel__Button TaskListToDoPanel__Button--remove"></button>
             </li>
            `;
        }
        document.querySelector(".TaskListToDoPanel__TaskList").innerHTML = HTMLstring;
    };

    const OnFormSubmit = (event) => {
        event.preventDefault();
        const TaskContainer = document.querySelector(".TaskAddingPanel_Input").value.trim();
        console.log(TaskContainer);

        if (TaskContainer === "") {
            return;
        }
        tasks.push({
            content: TaskContainer,
            done: false,
        })
        render();
    };

    const init = () => {

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", OnFormSubmit);
        render();

    };
    init();
}
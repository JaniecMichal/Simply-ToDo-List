{
    const OnFormSubmit = (event) => {
        event.preventDefault();

    };
    const init = () => {
        
        const form = document.querySelector(".js-form");
        const addNewTaskButton = document.querySelector(".js-addNewTask");
        form.addEventListener("submit", OnFormSubmit);

    };
    init();
}
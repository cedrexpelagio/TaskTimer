const form = document.querySelector('.add-task-form');
const taskList = document.querySelector('.task-list');
// User Input
const nameInput = document.querySelector('.task-input');
const durationInput = document.querySelector('.task-duration-input');
const descInput = document.querySelector('.task-desc-input');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskName = nameInput.value;
    const taskDuration = durationInput.value;
    const taskDesc = descInput.value;

    // Build the <li>
    const newTask = document.createElement('li');
    newTask.classList.add('task-item', 'container');

    // Div for task title and duration
    const taskTitleTime = document.createElement('div');
    taskTitleTime.classList.add('task-list-name-duration', 'container', 'item');

    // Task Title
    const taskTitle = document.createElement('h3');
    taskTitle.textContent = taskName;
    taskTitle.classList.add('task-list-title', 'item');

    // Task Duration in a span
    const taskDurationSpan = document.createElement('span');
    taskDurationSpan.textContent = taskDuration + ' mins';
    taskDurationSpan.classList.add('task-list-duration', 'item');

    // Assemble the task title and duration
    taskTitleTime.appendChild(taskTitle);
    taskTitleTime.appendChild(taskDurationSpan);

    // Task Description in paragraph
    const taskDescPara = document.createElement('p');
    taskDescPara.textContent = taskDesc;
    taskDescPara.classList.add('task-list-desc', 'item');

    // Div for task info (title, duration, description)
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-list-info', 'container', 'item');

    // Assemble the task info
    taskInfo.appendChild(taskTitleTime);
    taskInfo.appendChild(taskDescPara);

    // Start button
    const startBtn = document.createElement('span');
    startBtn.textContent = 'Start';
    startBtn.classList.add('start-task-btn', 'btn');

    // Delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn', 'btn');

    deleteBtn.addEventListener('click', function () {
        newTask.remove(); // removes this specific <li> from the page
    });

    // Assemble everything into the <li>
    newTask.appendChild(startBtn);
    newTask.appendChild(taskInfo);
    newTask.appendChild(deleteBtn);

    // Add the finished <li> to the list
    taskList.appendChild(newTask);

    form.reset();
});
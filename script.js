const form = document.querySelector('.add-task-form');
const taskList = document.querySelector('.task-list');
const timer = document.querySelector('.timer');
// User Input
const nameInput = document.querySelector('.task-input');
const durationInput = document.querySelector('.task-duration-input');
const descInput = document.querySelector('.task-desc-input');

// Timer Feature
function displayTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.querySelector('.hours').textContent = hours < 10 ? `0${hours}` : hours;
    document.querySelector('.minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector('.seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function timeFormat (totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let stringHours = "";
    let stringMins = "";
    let stringSec = "";

    stringHours = hours < 10 ? `0${hours}` : String(hours);
    stringMins = minutes < 10 ? `0${minutes}` : String(minutes);
   stringSec = seconds < 10 ? `0${seconds}` : String(seconds);

    return timeFormated = stringHours + ":" + stringMins + ":" + stringSec;
}

function changeBtn (startBtn){
    startBtn.textContent = "Done";
    startBtn.classList.remove('in-progress-btn');
    startBtn.classList.add('done-btn');
}

function minCountDown(minutes, startBtn) {
    let totalSeconds = minutes * 60;
    displayTime(totalSeconds);

    const intervalId = setInterval(() => {
        totalSeconds--;
        displayTime(totalSeconds);

        if (totalSeconds === 0) {
            clearInterval(intervalId);
            changeBtn(startBtn);      
        }
    }, 1000);
}

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
    taskDurationSpan.textContent = timeFormat(taskDuration * 60);
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
    let taskTimerStart = false;
    const startBtn = document.createElement('span');
    startBtn.textContent = 'Start';
    startBtn.classList.add('start-task-btn', 'btn');

    startBtn.addEventListener('click', function () {
        let minutes = taskDuration;

        if (!taskTimerStart){
        timer.classList.remove('hidden');
        minCountDown(minutes, startBtn);
        startBtn.textContent = 'In Progress';
        startBtn.classList.add('in-progress-btn');
        document.querySelector('.task-title').textContent = taskName;
        document.querySelector('.task-desc').textContent = taskDesc;
        taskTimerStart = true;
        }

    });

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


const form = document.querySelector('.add-task-form');
const taskList = document.querySelector('.task-list');
const taskDoneList = document.querySelector('.task-done-list');
const timer = document.querySelector('.timer');
const closeBtn = document.querySelector('.close-btn');
const inProgresTitle = document.querySelector('.in-progress-title');
const inProgress =  document.querySelector('.in-progress-section');
const openBtn = document.querySelector('.open-btn');
const pauseBtn = document.querySelector('.pause-btn');
const taskListEmptyMsg = taskList.querySelector('.empty-task-list');
const taskDoneListEmptyMsg = taskDoneList.querySelector('.empty-task-list');
const now = new Date();
// User Input
const nameInput = document.querySelector('.task-input');
const durationInput = document.querySelector('.task-duration-input');
const descInput = document.querySelector('.task-desc-input');

let numTask = 0;
let numTaskDone = 0;
let isTaskRunning = false;
let isPaused = false;
let currentDoneBtn = null;
let remainingSeconds = 0;
let activeIntervalId = null;
const allStartBtns = [];

function manipulateEmptyMsg (){
    if (numTask === 0) {
        taskListEmptyMsg.classList.remove('hidden');
    } else {
        taskListEmptyMsg.classList.add('hidden');
    }

    if (numTaskDone === 0) {
        taskDoneListEmptyMsg.classList.remove('hidden');
    } else {
        taskDoneListEmptyMsg.classList.add('hidden');
    }
}

function showTaskInProgress() {
    inProgress.classList.remove('hidden');
}

function hideTaskInProgress() {
    inProgress.classList.add('hidden');
}

function showTimer() {
    timer.classList.remove('hidden');
    document.body.classList.add('active');
}

function hideTimer() {
    timer.classList.add('hidden');
    document.body.classList.remove('active');
}

function lockOtherStartButtons(exceptBtn) {
    allStartBtns.forEach((btn) => {
        if (btn !== exceptBtn) {
            btn.classList.add('disabled-btn');
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.5';
        }
    });
}

function unlockAllStartButtons() {
    allStartBtns.forEach((btn) => {
        btn.classList.remove('disabled-btn');
        btn.style.pointerEvents = '';
        btn.style.opacity = '';
    });
}

function resetActiveTimerState() {
    isTaskRunning = false;
    if (activeIntervalId !== null) {
        clearInterval(activeIntervalId);
        activeIntervalId = null;
    }
    timer.classList.add('hidden');
    isPaused = false;
    currentDoneBtn = null;
    remainingSeconds = 0;
    unlockAllStartButtons();
}

// Timer Feature
function displayTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.querySelector('.hours').textContent = hours < 10 ? `0${hours}` : hours;
    document.querySelector('.minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector('.seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
}

function timeFormat(totalSeconds) {
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

function changeBtn(startBtn) {
    startBtn.textContent = "Done";
    startBtn.classList.remove('in-progress-btn');
    startBtn.classList.add('done-btn');
}

function runTimer (){

  activeIntervalId = setInterval(() => {
        remainingSeconds--;
        displayTime(remainingSeconds);

        if (remainingSeconds === 0) {
            clearInterval(activeIntervalId);
            activeIntervalId = null;
            changeBtn(currentDoneBtn);
            hideTimer();
            hideTaskInProgress();
            resetActiveTimerState();
        }
    }, 1000);

}

function minCountDown(minutes, doneBtn) {
    remainingSeconds = minutes * 60;
    currentDoneBtn = doneBtn;
    displayTime(remainingSeconds);
    runTimer();
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    numTask++;
    console.log("Task: " + numTask);
    manipulateEmptyMsg();
    const taskName = nameInput.value;
    const taskDuration = durationInput.value;
    const taskDesc = descInput.value;
    const date = document.createElement('div');
    date.classList.add('date');
    date.textContent = now.toLocaleDateString();

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
    const startBtn = document.createElement('span');
    startBtn.textContent = 'Start';
    startBtn.classList.add('start-task-btn', 'btn');

    if (isTaskRunning) {
            startBtn.classList.add('disabled-btn');
            startBtn.style.pointerEvents = 'none';
            startBtn.style.opacity = '0.5';
    }

    const doneBtn = document.createElement('span');
    doneBtn.textContent = 'In Progress';
    doneBtn.classList.add('in-progress-btn', 'btn');

    allStartBtns.push(startBtn);

    startBtn.addEventListener('click', function () {
        // Ignore clicks if a task is already running, or this button
        // has been disabled while another task is active.
        if (isTaskRunning) return;

        isTaskRunning = true;
        lockOtherStartButtons(startBtn);

        let minutes = taskDuration;

        showTimer();

        startBtn.remove();

        newTask.appendChild(doneBtn);
        newTask.appendChild(taskInfo);
        newTask.appendChild(deleteBtn);

        minCountDown(minutes, doneBtn);

        document.querySelector('.task-title').textContent = taskName;
        document.querySelector('.task-desc').textContent = taskDesc;

        inProgresTitle.textContent = taskName;

    });

    doneBtn.addEventListener('click', function () {
        if (!doneBtn.classList.contains('done-btn')) return;

        doneBtn.remove();
        deleteBtn.classList.add('task-done-delete-btn');

        newTask.appendChild(date);
        newTask.appendChild(taskInfo);
        newTask.appendChild(deleteBtn);

        taskDoneList.appendChild(newTask);
        numTask--;
        numTaskDone++;
        manipulateEmptyMsg();
    });

    // Delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn', 'btn');

    deleteBtn.addEventListener('click', function () {
        // If the task being deleted is the one currently running
        // (its doneBtn is still showing "In Progress"), free up the
        // timer so other tasks can be started again.
        if (doneBtn.classList.contains('in-progress-btn') && newTask.contains(doneBtn)) {
            resetActiveTimerState();
            hideTaskInProgress();
        }
        newTask.remove(); // removes this specific <li> from the page

        // Update the task counters based on which list the task was in
        if (deleteBtn.classList.contains('task-done-delete-btn')) {
            numTaskDone--;
        } else {
            numTask--;
        }
        manipulateEmptyMsg();
    });

    // Assemble everything into the <li>
    newTask.appendChild(startBtn);
    newTask.appendChild(taskInfo);
    newTask.appendChild(deleteBtn);

    // Add the finished <li> to the list
    taskList.appendChild(newTask);

    form.reset();
});

pauseBtn.addEventListener('click', function () {

    if(!isTaskRunning) return;

    if (!isPaused) {
        // Pause
        isPaused = true;
        pauseBtn.textContent = "Resume";
        clearInterval(activeIntervalId);
    } else {
        // Resume
        isPaused = false;
        pauseBtn.textContent = "Pause";
        runTimer();
    }
});

closeBtn.addEventListener('click', function () {
    hideTimer();
    showTaskInProgress();
});

openBtn.addEventListener('click', function () {
    showTimer();
    hideTaskInProgress();
});
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let timer;
let timeLeft = 1500;

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    let completedCount = 0;

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) completedCount++;

        li.innerHTML = `
            <span onclick="toggleComplete(${index})"
            class="${task.completed ? 'completed' : ''}">
            ${task.text}
            </span>
            <button onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("progress").innerText = completedCount;
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value === "") return;

    tasks.push({ text: input.value, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Pomodoro Session Complete! 🎉");
            timeLeft = 1500;
        } else {
            timeLeft--;
        }
        updateTimer();
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 1500;
    updateTimer();
}

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").innerText =
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const motivationalMessages = [
    "You are capable of amazing things 💪",
    "Start small. Stay consistent.",
    "Discipline beats motivation.",
    "Your future self will thank you.",
    "One task at a time.",
    "Progress > Perfection.",
    "Do it now. Not later."
];

function generateMotivation() {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    document.getElementById("aiMessage").innerText =
        motivationalMessages[randomIndex];
}

renderTasks();
updateTimer();
document.getElementById("focusBtn").addEventListener("click", function () {
    document.body.classList.toggle("focus-active");
});
let xp = 0;
let streak = 0;

document.getElementById("addXP").addEventListener("click", function () {
    xp += 10;
    streak += 1;

    document.getElementById("xpCount").innerText = xp;
    document.getElementById("streakCount").innerText = streak;
});
let progress = 0;

document.getElementById("increaseProgress").addEventListener("click", function () {
    if (progress < 100) {
        progress += 10;
        document.getElementById("progressBar").style.width = progress + "%";
    }
});
document.getElementById("generatePlan").addEventListener("click", function () {
    let subject = document.getElementById("subjectInput").value;

    let plan = "📚 Study " + subject + " for 25 mins\n" +
               "☕ Take 5 min break\n" +
               "📝 Revise key concepts\n" +
               "🧠 Practice 5 problems";

    document.getElementById("studyPlan").innerText = plan;
});




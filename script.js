let countdownInterval;
let targetDate;
let paused = false;
let remainingTime;

function startCountdown() {
    clearInterval(countdownInterval);
    paused = false;

    const inputDate = document.getElementById("datetime-picker").value;
    targetDate = new Date(inputDate).getTime();

    if (isNaN(targetDate)) {
        alert("Please select a valid date and time!");
        return;
    }

    remainingTime = targetDate - new Date().getTime();

    if (remainingTime <= 0) {
        alert("Please select a future date and time!");
        return;
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    if (paused) return;

    const now = new Date().getTime();
    remainingTime = targetDate - now;

    if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "🎉 Time's up!";
        document.getElementById("message").innerText = "Event Started!";
        document.getElementById("alarm").play();
        document.getElementById("progress").style.width = "0%";
        return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    updateProgressBar();
}

function pauseCountdown() {
    paused = true;
    clearInterval(countdownInterval);
}

function resumeCountdown() {
    if (paused) {
        paused = false;
        targetDate = new Date().getTime() + remainingTime;
        countdownInterval = setInterval(updateCountdown, 1000);
    }
}

function resetCountdown() {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML = "00d : 00h : 00m : 00s";
    document.getElementById("message").innerText = "";
    document.getElementById("progress").style.width = "100%";
    paused = false;
}

function updateProgressBar() {
    const initialTime = targetDate - new Date().getTime() + remainingTime;
    const percentage = (remainingTime / initialTime) * 100;
    document.getElementById("progress").style.width = percentage + "%";
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

document.getElementById("workoutForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const workoutModal = document.getElementById("workoutModal");
    const workoutDetails = document.getElementById("workoutDetails");
    const muscleFocus = document.getElementById("exercise-set-gym").value;

    try {
        const workoutText = await getWorkoutDetailsText(muscleFocus);
        displayWorkoutPopup(workoutDetails, workoutModal, workoutText);
    } catch (error) {
        console.error('Error:', error);
        displayWorkoutPopup(workoutDetails, workoutModal, "Error fetching workout details.");
    }
});

async function getWorkoutDetailsText(muscleFocus) {
    const apiUrl = `http://localhost:3000/Workouts`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Received data:', data);

        if (Array.isArray(data) && data.length > 0) {
            const workout = data.find(item => item.id === muscleFocus);
            console.log(data);

            if (workout) {
                const { name, details, "pro tip": proTip } = workout;

                // Split keys and values, join with line breaks and extra space
                const workoutText = `${name}:\n${details.split('\n').join('\n\n')}\n\nPro Tip:\n${proTip.split('\n').join('\n\n')}\n\n`;

                return workoutText;
            } else {
                return "No specific workout details available.";
            }
        } else {
            throw new Error('Invalid data format received.');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error; 
    }
}



function displayWorkoutPopup(workoutDetails, workoutModal, workoutText) {
    workoutDetails.innerHTML = workoutText;
    workoutModal.style.display = "block";
}

function closeModal() {
    const workoutModal = document.getElementById("workoutModal");
    workoutModal.style.display = "none";
}

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

let timerInterval;
let startTime;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', endTimer);

function startTimer() {
    showTimer();
    startButton.disabled = true;
    stopButton.disabled = false;
    startTime = new Date().getTime();
}

function endTimer() {
    clearInterval(timerInterval);
    stopButton.disabled = true;
    startButton.disabled = false;
    const endTime = new Date().getTime();
    const totalTime = (endTime - startTime) / 1000;
    console.log('Total Time:', totalTime.toFixed(3), 'seconds');
}

function showTimer() {
    let mins, secs, millis;

    timerInterval = setInterval(() => {
        const diff = new Date().getTime() - startTime;

        mins = parseInt(diff / 1000 / 60);
        mins = mins < 10 ? '0' + mins : mins;

        secs = parseInt(diff / 1000);
        secs = secs < 10 ? '0' + secs : secs;

        if (secs > 60) secs %= 60;

        millis = diff % 1000;
        if (millis > 1000) millis %= 1000;

        timerElement.textContent = `${mins}:${secs}:${millis}`;
    }, 10);
}


const start = new Date('July 1, 2000');
const end = new Date('August 1 2000');
console.log(start.getTime());
console.log(end.getTime());

const diff = end.getTime() - start.getTime();
console.log(diff);

const seconds = parseInt(diff/1000);
const minutes = parseInt(diff/1000/60);
console.log(minutes,seconds);


const quotes = [
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston S. Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
    "Believe you can and you're halfway there. -Theodore Roosevelt",
    "Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats",
    "Life is really simple, but we insist on making it complicated. - Confucius",
    "The only place where success comes before work is in the dictionary. - Vidal Sassoon"
];


let currentIndex = 0;

function displayCurrentQuote() {
    const quoteDisplay = document.getElementById("quote-display");
    quoteDisplay.textContent = quotes[currentIndex];
}

function showNextQuote() {
    currentIndex = (currentIndex + 1) % quotes.length;
    displayCurrentQuote();
}

function showPreviousQuote() {
    currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
    displayCurrentQuote();
}

document.addEventListener("DOMContentLoaded", displayCurrentQuote);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        showNextQuote();
    } else if (event.key === "ArrowLeft") {
        showPreviousQuote();
    }
});

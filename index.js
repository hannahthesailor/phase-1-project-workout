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
                return `${name}: ${details}\nPro Tip: ${proTip}`;
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


const myInput = document.getElementById('myInput');

myInput.addEventListener('keyup', handleKeyup);

function handleKeyup() {
    fetch('')

}
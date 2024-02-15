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
        throw error; // Re-throw the error to be caught
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

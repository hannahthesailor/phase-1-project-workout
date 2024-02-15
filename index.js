// index.js

document.getElementById("workoutForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var workoutModal = document.getElementById("workoutModal");
    var workoutDetails = document.getElementById("workoutDetails");
    var muscleFocus = document.getElementById("exercise-set-home").value;

    // Customize the workout details text based on the selected muscle focus
    var workoutText = getWorkoutDetailsText(muscleFocus);
    
    workoutDetails.innerHTML = workoutText;
    workoutModal.style.display = "block";
});

function getWorkoutDetailsText(muscleFocus) {
    // Customize the workout details text based on the selected muscle focus
    switch (muscleFocus) {
        case "glutesQuads":
            return "Work on your glutes and quads with targeted exercises.";
        case "pushDay":
            return "Focus on your back and biceps during your push day.";
        case "glutes":
            return "Engage in glute-specific exercises for a stronger lower body.";
        case "pullday":
            return "Train your chest, triceps, and shoulders during your pull day.";
        case "glutesHams":
            return "Strengthen your glutes and hamstrings with effective workouts.";
        default:
            return "No specific workout details available.";
    }
}

function closeModal() {
    var workoutModal = document.getElementById("workoutModal");
    workoutModal.style.display = "none";
}

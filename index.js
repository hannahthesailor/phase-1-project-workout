document.getElementById("workoutForm").addEventListener("submit", function (event) {
    event.preventDefault();

  
    var workoutModal = document.getElementById("workoutModal");
    workoutModal.innerHTML = "<p>Your workout details go here.</p>";
    workoutModal.style.display = "block";
});

const workoutGroups = ["glute", "backBis"];
const gluteWorkout = {
    key: "hipthrust"
};
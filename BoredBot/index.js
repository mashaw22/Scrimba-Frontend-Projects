const activity = document.getElementById("activity-name")
const btn = document.getElementById("btn")

btn.addEventListener("click", function() {
    fetch("https://apis.scrimba.com/bored/api/activity")
        .then(response => response.json())
        .then(data => {
        activity.textContent =  data.activity
    })
})






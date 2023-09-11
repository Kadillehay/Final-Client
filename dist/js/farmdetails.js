
document.addEventListener("DOMContentLoaded", function () {
    const beefCheckbox = document.getElementById("beefCheckbox");
    const seasonAvailable = document.getElementById("seasonAvailable");

    beefCheckbox.addEventListener("change", function () {
        if (beefCheckbox.checked) {

            seasonAvailable.classList.remove("hidden");
        } else {

            seasonAvailable.classList.add("hidden");
        }
    });
});

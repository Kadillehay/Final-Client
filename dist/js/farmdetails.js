console.log("beef");

    const beefCheckbox = document.getElementById("beefCheckbox");
    const seasonAvailable = document.getElementById("seasonAvailable");
    const additionalOptions = document.querySelector(".additional-options")
    beefCheckbox.checked = false;
    beefCheckbox.addEventListener("change", function () {
        console.log(beefCheckbox.checked); 
        if (beefCheckbox.checked) {

            additionalOptions.classList.remove("hidden");
        } else {

            additionalOptions.classList.add("hidden");
        }
    });


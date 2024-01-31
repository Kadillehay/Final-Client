const fetchDetails = () => {
  fetch("https://final-api-v2-production.up.railway.app/get-details")
    .then((response) => response.json())
    .then((data) => console.log(data));
};

window.addEventListener("DOMContentLoaded", fetchDetails);

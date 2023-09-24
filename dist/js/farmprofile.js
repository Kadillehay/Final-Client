
const fetchDetails = () => {
    fetch("http://localhost:8080/get-details").then(response => response.json()).then(data => console.log(data));
}

window.addEventListener('DOMContentLoaded', fetchDetails);
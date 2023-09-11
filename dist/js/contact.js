document
.querySelector('button[type="submit"]')
.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const contactMessage = {
        name: name,
        email: email,
        message: message
    };

    fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactMessage)
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);

        })
        .catch(error => {

            console.error(error);
        });
});
console.log("what was my mistake");
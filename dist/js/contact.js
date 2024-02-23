let submitted = false;
document
  .querySelector('button[type="submit"]')
  .addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const contactMessage = {
      name: name,
      email: email,
      message: message,
    };
    if (name !== "" && email !== "" && message !== "") {
      fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactMessage),
      })
        .then((response) => response.json())
        .then((data) => {
          submitted = true;
          if (data) {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            alert("Message submitted! Thank you.");
          } else {
            alert("Submission failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      if (!submitted) {
        document.getElementById("name").placeholder = "Required";
        document.getElementById("email").placeholder = "Required";
        document.getElementById("message").placeholder = "Required";
      }
    }
  });

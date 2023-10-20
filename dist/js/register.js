let submitted = false;

document
  .querySelector('button[type="submit"]')
  .addEventListener("click", function submitForm(e) {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const emailAddress = document.getElementById("emailAddress").value;
    const password = document.getElementById("password").value;
    const farmName = document.getElementById("farmName").value;
    if (firstName && lastName && emailAddress && password && farmName) {
      const formData = {
        firstName,
        lastName,
        emailAddress,
        password,
        farmName,
      };
      if (
        !firstName == "" &&
        !lastName == "" &&
        !emailAddress == "" &&
        !password == "" &&
        !farmName == ""
      ) {
        fetch("http://localhost:8080/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            submitted = true;
            if (data) {
              document.getElementById("firstName").value = "";
              document.getElementById("lastName").value = "";
              document.getElementById("emailAddress").value = "";
              document.getElementById("password").value = "";
              document.getElementById("farmName").value = "";
              alert("Registration successful!");
              const myDetails = data?.id;
              localStorage.setItem(
                "user",
                JSON.stringify([myDetails?.id, myDetails?.farmName])
              );

              localStorage.setItem(
                "authUser",

                JSON.stringify({ ...myDetails, auth: true })
              );
              window.location.href = "./farmdetails.html";
            } else {
              alert("Registration failed. Please try again.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
          });
      } else {
      }
    } else {
      if (!submitted) {
        document.getElementById("firstName").placeholder = "Required";
        document.getElementById("lastName").placeholder = "Required";
        document.getElementById("emailAddress").placeholder = "Required";
        document.getElementById("password").placeholder = "Required";
        document.getElementById("farmName").placeholder = "Required";
      }
      alert("Fill all the fields!");
    }
  });
const registrationForm = document.getElementById("registrationForm");
// registrationForm.addEventListener("submit", submitForm);

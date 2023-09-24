// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get form input values
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const emailAddress = document.getElementById("emailAddress").value;
    const password = document.getElementById("password").value;
    const farmName = document.getElementById("farmName").value;
    
    // Create an object with the form data
    const formData = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      farmName: farmName
    };
  console.log("something");
   fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {

        alert("Registration successful!");
        window.location.href = "./farmdetails.html"; 
      } else {
   
        alert("Registration failed. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
  }
  
  const registrationForm = document.getElementById("registrationForm");
  registrationForm.addEventListener("submit", submitForm);
  
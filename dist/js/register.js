// Selecting form fields
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const emailAddress = document.getElementById("emailAddress")
const password = document.getElementById("password")
const farmName = document.getElementById("farmName")
const submitBtn = document.querySelector('button[type="submit"]')

 const  validateFormFields = (firstName,lastName,emailAddress,password,farmName) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailAddress.value !== '' && !pattern.test(emailAddress.value)) {
    if(emailAddress) {
      emailAddress.value = 'Invalid email format!'
      emailAddress.style.color = 'red'
      emailAddress.style.fontSize = '11px'
      emailAddress.style.fontStyle = 'italic'
      return
    }
  }
  if (firstName.value === '' || lastName.value === '' || emailAddress.value === '' || password.value === '' || farmName.value === '') {
      firstName.placeholder = "This field cannot be blank";
      lastName.placeholder = "This field cannot be blank";
      emailAddress.placeholder = "This field cannot be blank";
      password.placeholder = "This field cannot be blank";
      farmName.placeholder = "This field cannot be blank";
      return false
    }  
    return true
}

  let submitted = false;


  submitBtn.addEventListener("click",submitForm);

  function submitForm(e) {
    e.preventDefault();
   
    
      const isValid = validateFormFields(firstName,lastName,emailAddress,password,farmName)
      console.log(isValid)
      if (!isValid) return

 
      const formData = {
        firstName: firstName.value,
        lastName:lastName.value,
        emailAddress:emailAddress.value,
        password:password.value,
        farmName:farmName.value,
      };
        fetch("https://final-api-v2-production.up.railway.app/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((res) => res.text())
          .then((data) => {
            submitted = true;
            if (data) {
             firstName.value = "";
              lastName.value = "";
              emailAddress.value = "";
              password.value = "";
              farmName.value = "";
              localStorage.setItem("token", JSON.stringify(data));
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
     
  }
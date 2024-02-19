let userAuth = JSON.parse(localStorage.getItem("authUser")) || {};
const token = JSON.parse(localStorage.getItem("token"));

if (!token) window.location.href = "./login";
// ALL UPDATING FOOD STUFF BELOW THIS:
// Selecting html elements
const farmName = document.querySelector("#farmName");
const farmEmail = document.querySelector("#farmEmail");
const phoneNumber = document.querySelector("#phoneNumber");
const viewFoodsBtn = document.querySelector("#viewFoodsBtn");
const meatFoods = document.querySelector("#meatFoods");
const vegFoods = document.querySelector("#vegFoods");
const fruitFoods = document.querySelector("#fruitFoods");
const dairyFoods = document.querySelector("#dairyFoods");


document.addEventListener("readystatechange", (e => {
  
  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", async () => {

      await fetchDetails()
      loadFarmerDetails()
    }) 
  }else {
    // loadFarmerDetails()
    fetchDetails().then(()=>loadFarmerDetails());
  }
}))

async function loadFarmerDetails() {
  console.log("User Auth =====> " + JSON.stringify(userAuth))
  console.log("Loading farmer details...")
  const res = await fetch("https://final-api-v2-production.up.railway.app/get-farmer-details", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    const user = await res.json();
  console.log("USER from api: " + JSON.stringify(user))
      localStorage.setItem("authUser", JSON.stringify({ ...userAuth, ...user }))
      // Fetching the Auth from localStorage(my cookies)
      if (!userAuth.auth) {
        window.location.href = "/dist/login.html";
      }

      // when there is a user authenticated
      else {
        if (user) {

          farmName.value = userAuth?.farmName || user.farmName
          farmEmail.value = userAuth?.emailAddress || user.emailAddress
          phoneNumber.value = userAuth?.phoneNumber || user.phoneNumber
        }
      }
     console.log("Farmer details are loaded!")
}
//UPDATE USER STUFF HERE:
document.getElementById("updateButton").addEventListener("click", (e) => {
  e.preventDefault();
  const updatedFarmName = document.getElementById("farmName").value;
  const updatedEmail = document.getElementById("farmEmail").value;
  const updatedPassword = document.getElementById("farmPassword").value;
  const updatedPhoneNumber = document.getElementById("phoneNumber").value;

  const updatedData = {
    originalEmail: userAuth.emailAddress,
    originalPassword: userAuth.password,
  };
  if (updatedFarmName) {
    updatedData["farmName"] = updatedFarmName;
  }
  if (updatedEmail) {
    updatedData["emailAddress"] = updatedEmail;
  }
  if (updatedPassword) {
    updatedData["password"] = updatedPassword;
  }
  if (updatedPhoneNumber) {
    updatedData["phoneNumber"] = updatedPhoneNumber;
  }
  console.log(updatedData);
  if (Object.keys(updatedData).length > 0) {
    fetch("https://final-api-v2-production.up.railway.app/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          localStorage.setItem(
            "authUser",
            JSON.stringify({ ...data, auth: true })
          );
          localStorage.setItem(
            "user",
            JSON.stringify([data?.id, data?.farmName])
          );
          alert("Update successful!");
          // Optionally, update the user's details in the local storage
        } else {
          alert("Update failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  }
});



const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", (e) => {
  localStorage.removeItem("authUser");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  if (!userAuth) window.location.href = "../login.html";
});
const fetchDetails = async() => {
 const response =  await fetch("https://final-api-v2-production.up.railway.app/get-details")
    const data = await response.json();
    
      console.log(data);
      let ourFarm = null;
      data.forEach((farm) => {
   if (farm.farmName === userAuth.farmName) {
          ourFarm = farm;
      }
      });
      meatFoods.textContent = "";
      vegFoods.textContent = "";
      fruitFoods.textContent = "";
      dairyFoods.textContent = "";
      console.log("OUR FARM::: " + JSON.stringify(ourFarm))
      for (let food in ourFarm) {
        if (ourFarm[food] && typeof ourFarm[food] === "boolean") {
          const foodName = food.charAt(0).toUpperCase() + food.slice(1);
          // console.log(foodName);
          console.log(food);
          switch (foodName) {
            case "Beef":
            case "Pork":
            case "Poultry":
            case "Mutton":
              if (document.querySelector(`.${foodName}`) === null) {
                const meatSpan = document.createElement("span");
                meatSpan.classList.add = foodName;
                meatSpan.textContent = `${foodName}`;
                meatSpan.style.border = "1px solid black";
                meatSpan.style.padding = "4px 6px";
                meatSpan.style.margin = "2px";
                meatSpan.style.fontSize = "14px";
                meatSpan.style.borderRadius = "12px";
                meatFoods.append(meatSpan);
                break;
              }

            case "Tomato":
            case "Carrot":
            case "Broccoli":
            case "Corn":
              const vegSpan = document.createElement("span");
              vegSpan.classList.add = foodName;
              vegSpan.textContent = `${foodName}`;
              vegSpan.style.border = "1px solid black";
              vegSpan.style.padding = "4px 6px";
              vegSpan.style.margin = "2px";
              vegSpan.style.fontSize = "14px";
              vegSpan.style.borderRadius = "12px";
              vegFoods.append(vegSpan);
              break;

            case "Blueberry":
            case "Strawberry":
            case "Apple":
            case "Pear":
              const fruitSpan = document.createElement("span");
              fruitSpan.classList.add = foodName;
              fruitSpan.textContent = `${foodName}`;
              fruitSpan.style.border = "1px solid black";
              fruitSpan.style.padding = "4px 6px";
              fruitSpan.style.margin = "2px";
              fruitSpan.style.fontSize = "14px";
              fruitSpan.style.borderRadius = "12px";
              fruitFoods.append(fruitSpan);
              break;

            case "Egg":
            case "Milk":
            case "Cream":
            case "Butter":
              const dairySpan = document.createElement("span");
              dairySpan.classList.add = foodName;
              dairySpan.textContent = `${foodName}`;
              dairySpan.style.border = "1px solid black";
              dairySpan.style.padding = "4px 6px";
              dairySpan.style.margin = "2px";
              dairySpan.style.fontSize = "14px";
              dairySpan.style.borderRadius = "12px";
              dairyFoods.append(dairySpan);
              // console.log(foodName);
              break;
            default:
              console.log("no food available");
          }
        }
      }
};
window.addEventListener("DOMContentLoaded", fetchDetails);
setTimeout(() => {
  fetchDetails();
  loadFarmerDetails()
}, 100);
viewFoodsBtn.addEventListener("click", () => {
  window.location.href = "./farmdetails.html";
});

// Selecting form fields

//Karen Changed 232 to const farmNameField, because farmName is a const already.
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const emailAddress = document.getElementById("emailAddress")
const password = document.getElementById("password")
const farmNameField = document.getElementById("farmName")
const submitBtn = document.querySelector('button[type="submit"]')

 const  validateFormFields = (firstName,lastName,emailAddress,password,farmNameField) => {
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
  if (firstName.value === '' || lastName.value === '' || emailAddress.value === '' || password.value === '' || farmNameField.value === '') {
      firstName.placeholder = "This field cannot be blank";
      lastName.placeholder = "This field cannot be blank";
      emailAddress.placeholder = "This field cannot be blank";
      password.placeholder = "This field cannot be blank";
      farmNameField.placeholder = "This field cannot be blank";
      return false
    }  
    return true
}

  let submitted = false;


  submitBtn.addEventListener("click",submitForm);

  function submitForm(e) {
    e.preventDefault();
   
    
      const isValid = validateFormFields(firstName,lastName,emailAddress,password,farmNameField)
      console.log(isValid)
      if (!isValid) return

 
      const formData = {
        firstName: firstName.value,
        lastName:lastName.value,
        emailAddress:emailAddress.value,
        password:password.value,
        farmNameField:farmName.value,
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
              farmNameField.value = "";
              localStorage.setItem("token", JSON.stringify(data));
              alert("Registration successful!");
              const myDetails = data?.id;
              localStorage.setItem(
                "user",
                JSON.stringify([myDetails?.id, myDetails?.farmNameField])
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
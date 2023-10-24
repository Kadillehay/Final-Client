//UPDATE USER STUFF HERE:
document.getElementById("updateButton").addEventListener("click", function updateUserInfo(e) {
  e.preventDefault();
  const updatedFarmName = document.getElementById("farm-name-label").value;
  const updatedEmail = document.getElementById("farmEmail").value;
  const updatedPassword = document.getElementById("farmPassword").value;
  const updatedPhoneNumber = document.getElementById("phoneNumber").value;

  if (updatedFarmName && updatedEmail && updatedPassword && updatedPhoneNumber) {
    const updatedData = {};
    if (updatedFarmName) {
      farmName: updatedFarmName;
    }
    if (updatedEmail) {
      email: updatedEmail;
    }
    if (updatedPhoneNumber) {
      phoneNumber: updatedPhoneNumber;
    }
    if (updatedPassword) {
      password: updatedPassword;
    }
console.log(updatedData)
    if (Object.keys(updatedData).length > 0) {
      fetch("http://localhost:8080/user-dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
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
    } else {
      alert("no field s to update");
    }
  }
});


// ALL UPDATING FOOD STUFF BELOW THIS:
const userAuth = JSON.parse(localStorage.getItem("authUser")) || {};
// Selecting html elements
const farmName = document.querySelector("#farmName");
const farmEmail = document.querySelector("#farmEmail");
const phoneNumber = document.querySelector("#phoneNumber");
const viewFoodsBtn = document.querySelector("#viewFoodsBtn");
const meatFoods = document.querySelector("#meatFoods");
const vegFoods = document.querySelector("#vegFoods");
const fruitFoods = document.querySelector("#fruitFoods");
const dairyFoods = document.querySelector("#dairyFoods");
// Fetching the Auth from localStorage(my cookies)
if (!userAuth.auth) {
  window.location.href = "/dist/login.html";
}

// when there is a user authenticated
else {
  farmName.value = userAuth.farmName;
  farmEmail.value = userAuth.emailAddress;
  phoneNumber.value = userAuth?.phoneNumber;
}
const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("authUser");
  if (!userAuth) window.location.href = "../login.html";
});
const fetchDetails = () => {
  fetch("http://localhost:8080/get-details")
    .then((response) => response.json())
    .then((data) => {
      let ourFarm = null;
      data.forEach((farm) => {
        if (farm.farmName === userAuth.farmName) {
          ourFarm = farm;
        }
      });
      meatFoods.textContent = '';
      vegFoods.textContent = '';
      fruitFoods.textContent = '';
      dairyFoods.textContent = '';

      for (let food in ourFarm) {
        if (ourFarm[food] && typeof ourFarm[food] === "boolean") {
          const foodName = food.charAt(0).toUpperCase() + food.slice(1);
          console.log(foodName)
          switch (foodName) {
            case "Beef":
            case "Pork":
            case "Poultry":
            case "Mutton":
              if (document.querySelector(`.${foodName}`) === null) {
                const span = document.createElement("span");
                span.classList.add = foodName
                span.textContent = `${foodName}`;
                span.style.border = "1px solid black";
                span.style.padding = "4px 6px";
                span.style.margin = "2px";
                span.style.fontSize = "14px";
                span.style.borderRadius = "12px";
                meatFoods.append(span);
                break;
              }

            case "Tomato":
            case "Carrot":
            case "Broccoli":
            case "Corn":
              const meatSpan = document.createElement("span");
              meatSpan.textContent = `${foodName}`;
              meatSpan.style.border = "1px solid black";
              meatSpan.style.padding = "4px 6px";
              meatSpan.style.margin = "2px";
              meatSpan.style.fontSize = "14px";
              meatSpan.style.borderRadius = "12px";
              vegFoods.append(meatSpan);
              break;
            case "Tomato":
            case "Carrot":
            case "Broccoli":
            case "Corn":
              const vegSpan = document.createElement("span");
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
              dairySpan.textContent = `${foodName}`;
              dairySpan.style.border = "1px solid black";
              dairySpan.style.padding = "4px 6px";
              dairySpan.style.margin = "2px";
              dairySpan.style.fontSize = "14px";
              dairySpan.style.borderRadius = "12px";
              dairyFoods.append(dairySpan);
              console.log(foodName)
              break;
            default:
              console.log("no food available");
          }



        }



      }
    });
};

window.addEventListener("load", fetchDetails);

viewFoodsBtn.addEventListener("click", () => {
  window.location.href = "./farmdetails.html";
});

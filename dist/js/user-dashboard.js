 let userAuth = JSON.parse(localStorage.getItem("authUser")) ||  {};
const token = JSON.parse(localStorage.getItem("token")); 
console.log(dogpoop);

 if (!token) window.location.href = "./login";
 
document.addEventListener("DOMContentLoaded", () => { 
  fetch("http://localhost:8080/get-farmer-details", { 
    method: "GET", 
    headers: { 
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,  
    }, 
  }) 
   .then((res) => res.json())
   .then((user) =>
      localStorage.setItem("authUser", JSON.stringify({ ...userAuth, ...user })) 
    ); 
}); 
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
    fetch("http://localhost:8080/update-user", { 
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
logoutBtn.addEventListener("click", (e) => { 
  localStorage.removeItem("authUser"); 
  localStorage.removeItem("user"); 
  localStorage.removeItem("token"); 
  if (!userAuth) window.location.href = "../login.html"; 
}); 
const fetchDetails = () => { 
  fetch("http://localhost:8080/get-details") 
    .then((response) => response.json()) 
    .then((data) => { 
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

      for (let food in ourFarm) {
        if (ourFarm[food] && typeof ourFarm[food] === "boolean") {
          const foodName = food.charAt(0).toUpperCase() + food.slice(1);
          console.log(foodName);
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
    }); 
}; 
 
window.addEventListener("load", fetchDetails); 
 
viewFoodsBtn.addEventListener("click", () => { 
  window.location.href = "./farmdetails.html"; 
}); 

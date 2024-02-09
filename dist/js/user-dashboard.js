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
    document.addEventListener("DOMContentLoaded", () => { 
 
      loadFarmerDetails() 
      fetchDetails() 
    })  
  }else { 
    loadFarmerDetails() 
    fetchDetails() 
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


//UPDATED LOGOUT TO CLEAR NAME,EMAIL,PHONE NUMBER, ADDED HREF TO LOGIN.HTML
const logoutBtn = document.getElementById("logout"); 
logoutBtn.addEventListener("click", (e) => { 
  localStorage.removeItem("authUser"); 
  localStorage.removeItem("user"); 
  localStorage.removeItem("token"); 
  if (!userAuth) window.location.href = "../login.html"; 
 
  farmName.value = "";
  farmEmail.value = "";
  phoneNumber.value = "";
 
 
  window.location.href = "../login.html";
}); 
const fetchDetails = async() => { 
 const response =  await fetch("https://final-api-v2-production.up.railway.app/get-details",{
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
if (response.ok) {
  const user = await response.json();
  localStorage.setItem("authUser", JSON.stringify({ ...userAuth, ...user }));
  farmName.value = "";
  farmEmail.value = "";
  phoneNumber.value = "";
  if (user) {
    farmName.value = user.farmName || userAuth.farmName;
    farmEmail.value = user.emailAddress || userAuth.emailAddress;
    phoneNumber.value = user.phoneNumber || userAuth.phoneNumber;
  }
}else{
  console.log("Error fetching farmer details:",response.statusText);
}
 //ORIGINAL UPDATED 2/9 to the above
    // const data = await response.json(); 
     
    //   console.log(data); 
    //   let ourFarm = null; 
    //   data.forEach((farm) => { 
    //       ourFarm = farm; 
      // }); 
      meatFoods.textContent = ""; 
      vegFoods.textContent = ""; 
      fruitFoods.textContent = ""; 
      dairyFoods.textContent = ""; 
      console.log("OUR FARM::: " + JSON.stringify(ourFarm)) 
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
};
window.addEventListener("DOMContentLoaded", fetchDetails); 
setTimeout(() => { 
  fetchDetails(); 
  loadFarmerDetails() 
}, 100); 
viewFoodsBtn.addEventListener("click", () => { 
  window.location.href = "./farmdetails.html"; 
}); 


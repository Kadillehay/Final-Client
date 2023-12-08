const userAuth = JSON.parse(localStorage.getItem("authUser")) || {}; 
let sendDetailsObject = { 
  userId: userAuth?.userId, 
  farmName: userAuth?.farmName, 
}; 
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
      for (let food in ourFarm) { 
        document.querySelectorAll('input[type="checkbox"]').forEach((input) => { 
          if (input.name === food && ourFarm[food] === true) { 
            input.checked = true; 
            sendDetailsObject[input.name] = true; 
          } 
        }); 
      } 
    }); 
}; 
 
window.addEventListener("DOMContentLoaded", fetchDetails); 
 
const form = document.getElementById("send-details"); 
document.querySelectorAll('input[type="checkbox"]').forEach((input) => { 
  input.addEventListener("change", (event) => { 
    let value = event.target.checked; 
    let name = event.target.name; 
    sendDetailsObject[name] = value; 
  }); 
}); 
form.addEventListener("submit", (e) => { 
  e.preventDefault(); 
  fetch("http://localhost:8080/send-details", { 
    method: "POST", 
    headers: { 
      "Content-Type": "application/json", 
    }, 
    body: JSON.stringify(sendDetailsObject),  
  }).then(() => { 
    window.location.href = "./user-dashboard.html"; 
  }); 
}); 

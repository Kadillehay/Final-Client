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
      meatFoods.textContent='';
      vegFoods.textContent='';
      fruitFoods.textContent='';
      dairyFoods.textContent='';
      for (let category in ourFarm) {
        if (ourFarm[category] && typeof ourFarm[category] === "boolean") {
          const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
         if(category === "meat"){
          meatFoods.textContent+= `${categoryName},`;
         }else if (category==="vegetable"){
          vegFoods.textContent += `${categoryName},`;
         }else if (category === "fruit"){
          fruitFoods.textContent += `${categoryName},`;
         }else if (category === "dairy"){
          dairyFoods.textContent += `${categoryName},`;
         }
        }
      }
    });
};

window.addEventListener("load", fetchDetails);

viewFoodsBtn.addEventListener("click", () => {
  window.location.href = "./farmdetails.html";
});

const userAuth = JSON.parse(localStorage.getItem("authUser")) || {};
// Selecting html elements
const farmName = document.querySelector("#farmName");
const farmEmail = document.querySelector("#farmEmail");
const phoneNumber = document.querySelector("#phoneNumber");
const viewFoodsBtn = document.querySelector("#viewFoodsBtn");
const foodList = document.querySelector("#food-list");
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
      const foods = new Map();
      let ourFarm = null;
      data.forEach((farm) => {
        if (farm.farmName === userAuth.farmName) {
          ourFarm = farm;
        }
      });
      for (let food in ourFarm) {
        if (ourFarm[food] && typeof ourFarm[food] === "boolean") {
          const li = document.createElement("li");
          li.textContent = `- ${food.toLocaleUpperCase()}`;
          foodList.append(li);
        }
      }
    });
};

window.addEventListener("load", fetchDetails);

viewFoodsBtn.addEventListener("click", () => {
  window.location.href = "./farmdetails.html";
});

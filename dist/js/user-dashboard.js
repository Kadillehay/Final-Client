const availableFoods = {};
// Selecting html elements
const farmName = document.querySelector("#farmName");
const farmEmail = document.querySelector("#farmEmail");
const phoneNumber = document.querySelector("#phoneNumber");

// Fetching the Auth from localStorage(my cookies)
const userAuth = JSON.parse(localStorage.getItem("authUser")) || {};

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

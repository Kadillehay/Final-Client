const userAuth = JSON.parse(localStorage.getItem("authUser")) || {};
const token = JSON.parse(localStorage.getItem("token"));
console.log(token);
console.log("User auth: " + JSON.stringify(userAuth));
if (JSON.stringify(userAuth) === "{}") window.location.href = "./login.html";
let sendDetailsObject = {
  userId: userAuth?.userId,
  farmName: userAuth?.farmName,
};
const fetchDetails = () => {
  fetch("https://final-api-v2-production.up.railway.app/get-details", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let ourFarm = null;
      console.log(data);

      data.forEach((farm) => {
        console.log(farm);
        console.log(userAuth.farmName);
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
async function loadFarmerDetails() {
  console.log("User Auth =====> " + JSON.stringify(userAuth));
  console.log("Loading farmer details...");
  const res = await fetch(
    "https://final-api-v2-production.up.railway.app/get-farmer-details",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user = await res.json();
  console.log("USER from api: " + JSON.stringify(user));
  localStorage.setItem("authUser", JSON.stringify({ ...userAuth, ...user }));
  // Fetching the Auth from localStorage(my cookies)
  if (!userAuth.auth) {
    window.location.href = "/dist/login.html";
  }

  // when there is a user authenticated
  else {
    if (user) {
      farmName.value = userAuth?.farmName || user.farmName;
      farmEmail.value = userAuth?.emailAddress || user.emailAddress;
      phoneNumber.value = userAuth?.phoneNumber || user.phoneNumber;
    }
  }
  console.log("Farmer details are loaded!");
}
setTimeout(() => {
  fetchDetails();
  // loadFarmerDetails();
}, 100);
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
  console.log(token);
  fetch("https://final-api-v2-production.up.railway.app/send-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sendDetailsObject),
  }).then(() => {
    window.location.href = "./user-dashboard.html";
  });
});

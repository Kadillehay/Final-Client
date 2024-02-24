const token = JSON.parse(localStorage.getItem("token")) || "";
let userAuth = JSON.parse(localStorage.getItem("authUser")) || {};
const emailAdress = document.querySelector("#emailAddress");
const password = document.querySelector("#passwordInput");
const farmName = document.querySelector("#farmName");
const button = document.querySelector('button[type="submit"]');
const phoneNumber = document.querySelector("#phoneNumber");

async function loadFarmerDetails(token) {
  console.log("Loading farmer details...");
  try {
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
    console.log(user);
    localStorage.setItem("authUser", JSON.stringify({ ...userAuth, ...user }));
    // Fetching the Auth from localStorage(my cookies)
    if (!userAuth.auth) {
      window.location.href = "/dist/login.html";
    }

    // when there is a user authenticated
    else {
      if (token) {
        console.log("asdas");
        // localStorage.setItem("user-details", JSON.stringify({}));
      }
    }
    console.log("Farmer details are loaded!");
  } catch (error) {
    console.log("Error fetching farmer details..", error);
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  const formData = {
    emailAddress: emailAdress.value,
    password: password.value,
    farmName: farmName.value,
  };
  handleSubmit(formData)
    .then((res) => {
      console.log("Form submitted");
      return res;
    })
    .then((token) => {
      console.log(token);
      if (token) {
        console.log("Token is valid");
        return loadFarmerDetails(token).then(() => {
          console.log("Farmer Details Fetching..");
          window.location.href = "./user-dashboard.html";
        });
      }
    });
});
const handleSubmit = async (credentials) => {
  try {
    const res = await fetch(
      "https://final-api-v2-production.up.railway.app/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    const user = await res.text();
    if (user) {
      localStorage.setItem("authUser", JSON.stringify({ auth: true }));
      localStorage.setItem("token", JSON.stringify(user));
      return user;
      // await handleGetFarmerDetails();
    }
  } catch (error) {
    console.log(error);
  }
};

// const handleGetFarmerDetails = async () => {
//   const response = await fetch("https://final-api-v2-production.up.railway.app/get-farmer-details", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const user = await response.json();
//   localStorage.setItem("authUser", JSON.stringify({ ...userAuth, ...user }));
// };

// if (formData) handleSubmit(formData);

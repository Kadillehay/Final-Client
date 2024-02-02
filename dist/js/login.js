const token = JSON.parse(localStorage.getItem("token")) || "";
let userAuth = JSON.parse(localStorage.getItem("authUser")) || {};
const emailAdress = document.querySelector("#emailAddress");
const password = document.querySelector("#passwordInput");
const farmName = document.querySelector("#farmName");
const button = document.querySelector('button[type="submit"]');

button.addEventListener("click", (e) => {
  e.preventDefault();
  const formData = {
    emailAddress: emailAdress.value,
    password: password.value,
    farmName: farmName.value,
  };
  handleSubmit(formData);
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
      // await handleGetFarmerDetails();
      window.location.href = "./user-dashboard.html";
    }
  } catch (error) {
    console.log(error);
  }
};

const handleGetFarmerDetails = async () => {
  const response = await fetch(
    "https://final-api-v2-production.up.railway.app/get-farmer-details",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user = await response.json();
  localStorage.setItem("authUser", JSON.stringify({ ...userAuth, ...user }));
};

if (formData) handleSubmit(formData);

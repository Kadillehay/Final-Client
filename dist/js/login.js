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
const handleSubmit = (credentials) => {
  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((user) => {
      if (user) {
        const authUser = { ...user, auth: true };
        localStorage.setItem("authUser", JSON.stringify(authUser));
        localStorage.setItem("user", JSON.stringify([farmName?.id, farmName.value]));
        console.log(user)
        window.location.href = "./user-dashboard.html";
      }
    })
    .catch((err) => new Error("Error thrown"));
};

handleSubmit(formData);

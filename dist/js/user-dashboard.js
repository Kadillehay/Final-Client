const userAuth = JSON.parse(localStorage.getItem("authUser")) || {};
if (!userAuth.auth) {
  window.location.href = "/dist/login.html";
} else {
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authUser");
    if (!userAuth) window.location.href = "../login.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const token = JSON.parse(localStorage.getItem("token"));
  fetch("http://localhost:8080/admin-dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((user) => {
      if (!user.isAdmin) window.location.href = "./user-dashboard.html";
      else fetchContactMessages();
    })
    .catch((e) => {
      console.error("Not authorized");
      window.location.href = "./user-dashboard.html";
    });
});

// const userID = JSON.parse(localStorage.getItem("user"))[0];
let showAllFarms = false;
const showAllFarmButton = document.getElementById("show-all-farm-button");
showAllFarmButton.addEventListener("click", () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!showAllFarms) {
    fetch("http://localhost:8080/user-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((farms) => {
        console.log(farms);
        const farmTable = document.querySelector("#farm-table");
        farmTable.innerHTML = "";
        farms.forEach((farm) => {
          const row = document.createElement("tr");
          row.innerHTML = ` 
        <td class="px-4 py-2">${farm.farmName}</td>
        <td class="px-4 py-2">${farm.emailAddress}</td>
        <td class="px-4 py-2">${farm.firstName}</td>
        <td class="px-4 py-2">${farm.lastName}</td>
        `;
          farmTable.appendChild(row);
        });
        showAllFarms = true;
        showAllFarmButton.textContent = "Show Less";
      });
  } else {
    const farmTable = document.querySelector("#farm-table");
    farmTable.innerHTML = "";
    showAllFarms = false;
    showAllFarmButton.textContent = "Show All";
  }
});

// MESSAGE STUFF

let showAll = false;
let globalData;
let contactMessagesTable;
function displayMessages(messages) {
  const filteredMessages = messages;
  console.log(messages);
  return filteredMessages;
}
function fetchContactMessages() {
  const showAllButton = document.getElementById("show-all-button");
  const token = JSON.parse(localStorage.getItem("token"));
  fetch("http://localhost:8080/admin-contact", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      globalData = data;
      contactMessagesTable = document.querySelector(
        "#contact-messages-table tbody"
      );
      contactMessagesTable.innerHTML = "";
      console.log(globalData);
      globalData.forEach((message) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-4 py-2">${message.name}</td>
            <td class="px-4 py-2">${message.email}</td>
            <td class="px-4 py-2">${message.message}</td>
          `;
        contactMessagesTable.insertBefore(row, contactMessagesTable.firstChild);
      });
      showAllFunction(data);
      showAll = true;
    });
}
function showAllFunction(globalData) {
  let filteredMessages = globalData;
  const showAllButton = document.getElementById("show-all-button");
  if (globalData) {
    if (showAll) {
      showAllButton.textContent = "Show All";
      showAll = false;
      filteredMessages = displayMessages(
        globalData.filter((i, index) => index <= 3)
      );
    } else {
      console.log(globalData);
      showAllButton.textContent = "Show Less";
      showAll = true;
      filteredMessages = displayMessages(globalData);
    }
  } else {
    console.error(
      " :( Data is undefined. Make sure your fetch request is successful."
    );
  }
  document.querySelector("#contact-messages-table tbody").innerHTML = "";
  filteredMessages.forEach((message) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="px-4 py-2">${message.name}</td>
            <td class="px-4 py-2">${message.email}</td>
            <td class="px-4 py-2">${message.message}</td>
          `;
    document
      .querySelector("#contact-messages-table tbody")
      .insertBefore(
        row,
        document.querySelector("#contact-messages-table tbody").firstChild
      );
  });
}
document
  .getElementById("show-all-button")
  .addEventListener("click", () => showAllFunction(globalData));
// window.addEventListener("DOMContentLoaded", fetchContactMessages);

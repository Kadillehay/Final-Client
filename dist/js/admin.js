// document.addEventListener("DOMContentLoaded", () => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   fetch("http://localhost:8080/admin-dashboard", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => res.text())
//     .then((data) => console.log(data));
// });

const userID = JSON.parse(localStorage.getItem("user"))[0];

const showAllFarmButton = document.getElementById("show-all-farm-button");
showAllFarmButton.addEventListener("click", () => {
  fetch("http://localhost:8080/get-user-farm-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userID),
  })
    .then((response) => response.json())
    .then((farms) => {
      console.log(farms);
      const farmTable = document.querySelector("#farm-table");
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
    });
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
  fetch("http://localhost:8080/admin")
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

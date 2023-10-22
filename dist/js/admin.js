

//  Grab userId from localstorage
// const userId = JSON.parse(localStorage.getItem("user"))[0];
// const farmName = JSON.parse(localStorage.getItem("user"))[1];
// if (userId) {
//   window.addEventListener("load", () => {
//     fetch(`http://localhost:8080/get-user-farm-details`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: userId,
//     })
//       .then((res) => res.json())
//       .then(
//         (data) =>{
//           (document.querySelector("#farm_name").textContent = data.farmName) 
//           console.log(data)
//         }
       
//       );
      
//   });
//   window.addEventListener("DOMContentLoaded",() => {
//     fetch('http://localhost:8080/get-user', {
//       method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: userId,

//     }
//     ).then((response) => response.json()).then(userData => console.log(userData)) 
//   })
// }

const userID = JSON.parse(localStorage.getItem("user"))[0];

if (userID) {
  window.addEventListener("load", () => {
    fetch(`http://localhost:8080/get-all-farm-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: userID,
    })
    .then((res)=> res.json())
    .then((data) => {
      const farmTable =document.querySelector("#farm-table");
      farmTable.innerHTML="";
    })
  })
  window.addEventListener("DOMContentLoaded", ()=> {
    fetch("http://localhost:8080/get-all-farm-details", {
      method:"GET",
    })
    .then((response) =>response.json())
    .then((farms)=> {
      const farmTable = document.querySelector("#farm-table");
      farmTable.innerHTML="";
      const recentFarms= farms.slice(0,10);
      recentFarms.forEach((farm)=> {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td class="px-4 py-2">${farm.name}</td>
            <td class="px-4 py-2">${farm.location}</td>
            <td class="px-4 py-2">${farm.contactEmail}</td>
        `;
        farmTable.appendChild(row);
      })
    })
  })
  const showAllFarmButton = document.getElementById("show-all-farm-button");
  showAllFarmButton.addEventListener("click", ()=> {
    fetch("http://localhost:8080/get-all-farm-details", {
      method:"GET",
    })
    .then((response)=> response.json())
    .then((farms)=> {
      const farmTable = document.querySelector("#farm-table");
      farmTable.innerHTML="";
      farms.forEach((farm)=>{
        const row = document.createElement("tr");
        row.innerHTML=`
        <td class="px-4 py-2">${farm.name}</td>
        <td class="px-4 py-2">${farm.location}</td>
        <td class="px-4 py-2">${farm.contactEmail}</td>
        `;
        farmTable.appendChild(row);
      })
    })
  })

}


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

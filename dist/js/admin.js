console.log("top");
let showAll = false;
let globalData;
let contactMessagesTable;
function displayMessages(messages) {
    globalData = messages;
  
}

function fetchContactMessages() {
    const showAllButton = document.getElementById("show-all-button");
    fetch("http://localhost:8080/admin") 
      .then(response => response.json())
      .then(data => {
        globalData = data;
        contactMessagesTable = document.querySelector("#contact-messages-table tbody");
        contactMessagesTable.innerHTML = ''; 
        console.log(globalData);
        globalData.forEach(message => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td class="px-4 py-2">${message.name}</td>
            <td class="px-4 py-2">${message.email}</td>
            <td class="px-4 py-2">${message.message}</td>
          `;
          contactMessagesTable.insertBefore(row, contactMessagesTable.firstChild);
        });
        showAllFunction(globalData);
      })
     
}
function showAllFunction(globalData){
    document.querySelector("#contact-messages-table tbody").innerHTML="";
        globalData.forEach(message => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td class="px-4 py-2">${message.name}</td>
            <td class="px-4 py-2">${message.email}</td>
            <td class="px-4 py-2">${message.message}</td>
          `;
          document.querySelector("#contact-messages-table tbody").insertBefore(row, document.querySelector("#contact-messages-table tbody").firstChild);
        });
        console.log(globalData);
        console.log(showAll);
        if(globalData) {
        if (showAll) {
            displayMessages(globalData.slice(0, 3));
            showAllButton.textContent = "Show All";
            showAll = false;
        } else {
            displayMessages(globalData);
            showAllButton.textContent = "Show Less";
            showAll = true;
        }
    }else{
        console.error(" :( Data is undefined. Make sure your fetch request is successful.");
    }
    };
    document.getElementById("show-all-button").addEventListener("click", showAllFunction(globalData));
  window.addEventListener("load", fetchContactMessages);
  
// admin.js

// Function to fetch contact messages
function fetchContactMessages() {
    fetch("http://localhost:8080/contact-messages") // Replace with the actual endpoint
      .then(response => response.json())
      .then(data => {
        // Populate the Contact Messages section with data
        const contactMessagesTable = document.querySelector("#contact-messages-table tbody");
        contactMessagesTable.innerHTML = ''; // Clear existing data
        
        data.forEach(message => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td class="px-4 py-2">${message.name}</td>
            <td class="px-4 py-2">${message.email}</td>
            <td class="px-4 py-2">${message.message}</td>
          `;
          contactMessagesTable.appendChild(row);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Call the function to fetch contact messages when the page loads
  window.addEventListener("load", fetchContactMessages);
  
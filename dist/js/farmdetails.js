const form = document.getElementById('send-details');
let sendDetailsObject = {}
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
input.addEventListener("change", (event) => {
    let value = event.target.checked;
    let name = event.target.name;
    console.log(event.target)
    sendDetailsObject[name] = value
    console.log(sendDetailsObject)
});  
})


form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch("http://localhost:8080/send-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendDetailsObject)
    })

}) 



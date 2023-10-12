const email = document.getElementById('emailAddress')
const password = document.getElementById('password')

async function getUser(formData) {
   const res = await  fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    
        
    })
  const user = await res.json();
  return user;
}
document.getElementById('registrationForm').addEventListener('submit', (e) =>{
    e.preventDefault()
    const formData = {
        emailAddress: email.value, 
        password: password.value
    }
    getUser(formData).then(data => console.log(data))
    
})
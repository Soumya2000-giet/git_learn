function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/7b57cf5d9fbd489daa79cc4c3022299b/appointmentData",
        userDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
    
    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
  

window.addEventListener('DOMContentLoaded',function(){
    axios.get("https://crudcrud.com/api/7b57cf5d9fbd489daa79cc4c3022299b/appointmentData")
.then((response) =>{
    for(var i=0;i<response.data.length;i++){
        displayUserOnScreen(response.data[i])
    }
})
.catch((error)=>{
    console.log(error)
})  

})

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );

    // Create Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);

    // Create Edit Button
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    // Delete Button Event Listener
    deleteBtn.addEventListener("click", function (event) {
        axios.delete(`https://crudcrud.com/api/7b57cf5d9fbd489daa79cc4c3022299b/appointmentData/${userDetails._id}`)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
      userList.removeChild(event.target.parentElement);
      // If using localStorage, you might want to adjust this part
      localStorage.removeItem(userDetails.email);
    });

    // Edit Button Event Listener
    editBtn.addEventListener("click", function (event) {
        
      userList.removeChild(event.target.parentElement);
      axios.delete(`https://crudcrud.com/api/7b57cf5d9fbd489daa79cc4c3022299b/appointmentData/${userDetails._id}`)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
      document.getElementById("username").value = userDetails.username;
      document.getElementById("email").value = userDetails.email;
      document.getElementById("phone").value = userDetails.phone;
    });
}
//   // Do not touch code below
//   module.exports = handleFormSubmit;
  
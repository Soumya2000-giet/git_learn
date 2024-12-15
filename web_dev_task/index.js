var s_count= document.getElementById('ulist1')

const dom_listen = () =>{
  document.getElementById('ulist').innerHTML=""
  s_count.innerHTML=""
  axios.get("https://crudcrud.com/api/6afb0c1cf2a140a081a7b585cfa13b0e/appointmentData")
  .then((response) =>{
      console.log(response.data)
      s_count.innerHTML = `<li>Total No of Students: ${response.data.length}</li>`
      for(var i=0;i<response.data.length;i++){
          displayStudentDetail(response.data[i])
      }
  })
  .catch((error)=>{
      console.log(error)
  })  
}
window.addEventListener('DOMContentLoaded',dom_listen);
 
 async function handleFormSubmit(event){
    try{
        event.preventDefault();
        
        console.log(event.target)
        const userDetails = {
        username: event.target.username.value,
        phone: event.target.phone.value,
        address: event.target.adress_txt.value,
        };
        const response =await axios
        .post(
            "https://crudcrud.com/api/6afb0c1cf2a140a081a7b585cfa13b0e/appointmentData",
            userDetails
        )
        console.log(response)
        
        
        // Clearing the input fields
        document.getElementById("username").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("address_text").value = "";
        dom_listen();
    }
    catch(error){
        console.log(error)
    }
    
  }
  
  function displayStudentDetail(user_details){
    // u_list.innerHTML += `<li>${user_details.username} ${user_details.phone} ${user_details.address} <button id="edit_btn">Edit</button><button id="dlt_btn">Delete</button></li>`;
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${user_details.username} - ${user_details.phone} - ${user_details.address}`
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

    const userList = document.getElementById("ulist");
    userList.appendChild(userItem);

    
    function editUser(event){
        console.log("inside edit user")
        deleteUser(event)
        document.getElementById("username").value = user_details.username;
        document.getElementById("phone").value = user_details.phone;
        document.getElementById("address_text").value = user_details.address;
      }
      async function deleteUser(event){
        try{
            console.log(`${document.getElementById('ulist')}`)
            document.getElementById('ulist').removeChild(event.target.parentElement)
            const response = await axios.delete(`https://crudcrud.com/api/6afb0c1cf2a140a081a7b585cfa13b0e/appointmentData/${user_details._id}`)
            console.log(response)
        }
        catch(error){
            console.log(error)
        }
        dom_listen()
      }
      editBtn.addEventListener('click',editUser)
      deleteBtn.addEventListener('click',deleteUser)


}

    


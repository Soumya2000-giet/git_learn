
const dom_listen = () =>{
  document.getElementById('ulist').innerHTML=""
  axios.get("https://crudcrud.com/api/d24d7a1653c14811a4cf31afb7901f1b/appointmentData")
  .then((response) =>{
      console.log(response.data)
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
        websitetitle: event.target.websitetitle.value,
        websiteurl: event.target.websiteurl.value,
        };
        const response =await axios
        .post(
            "https://crudcrud.com/api/d24d7a1653c14811a4cf31afb7901f1b/appointmentData",
            userDetails
        )
        console.log(response)
        
        
        // Clearing the input fields
        document.getElementById("websitetitle").value = "";
        document.getElementById("websiteurl").value = "";
        dom_listen();
    }
    catch(error){
        console.log(error)
    }
    
  }
  
  function displayStudentDetail(user_details){
    // u_list.innerHTML += `<li>${user_details.username} ${user_details.phone} ${user_details.address} <button id="edit_btn">Edit</button><button id="dlt_btn">Delete</button></li>`;
    const userItem = document.createElement("li");
    // userItem.appendChild(
    //   document.createTextNode(
    //     `${user_details.websitetitle} > ${user_details.websiteurl}`
    //   )
    // );
    const link_e = document.createElement('a')
    link_e.href = user_details.websiteurl
    link_e.textContent = user_details.websitetitle


    userItem.appendChild(link_e)

    

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
        document.getElementById("websitetitle").value = user_details.websitetitle;
        document.getElementById("websiteurl").value = user_details.websiteurl;
      }
      async function deleteUser(event){
        try{
            console.log(`${document.getElementById('ulist')}`)
            document.getElementById('ulist').removeChild(event.target.parentElement)
            const response = await axios.delete(`https://crudcrud.com/api/d24d7a1653c14811a4cf31afb7901f1b/appointmentData/${user_details._id}`)
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

    


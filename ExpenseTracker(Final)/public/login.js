async function handleFormSubmit(event) {
    event.preventDefault();

    
    const UserDetails = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    try{
    const result = await axios.post("http://localhost:3000/user/login",UserDetails)
    if (result.data.status === true){
        alert('user login successful')
        localStorage.setItem('token',result.data.token)
        window.location.href = "index.html";
        
    }
    }
    catch(err){
        console.log(err.response.data)
        alert(`${err.response.data.message}`)
    }
    // Clearing the input fields
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
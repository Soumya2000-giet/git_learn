async function handleFormSubmit(event) {
    event.preventDefault();
    const UserDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    axios
      .post(
        "http://localhost:3000/user/adduser",
        UserDetails
      )
      .then((response) => {alert("user Registaration successful")
        console.log(JSON.stringify(response.data.data))
      })
      .catch((error) => console.log(error));
    
    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
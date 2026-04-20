async function handleFormSubmit(event) {
  event.preventDefault();

  const UserDetails = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const result = await axios.post(
      "http://localhost:3000/user/login",
      UserDetails
    );

    if (result.data.status === true) {
      alert("User login successful");
      localStorage.setItem("token", result.data.token);
       window.location.href = "chatwindow.html";
    }
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

/* SHOW FORGOT PASSWORD FORM */
function showForgotPasswordForm() {
  document.getElementById("forgot-password-form").style.display = "block";
}

/* HANDLE FORGOT PASSWORD SUBMISSION */
async function handleForgotPassword(event) {
  event.preventDefault();

  const email = document.getElementById("forgot-email").value;

  try {
    const response = await axios.post(
      "http://localhost:3000/user/password/forgotpassword",
      { email }
    );

    alert(response.data.message || "Password reset link sent to your email");
  } catch (err) {
    console.log(err.response.data);
    alert(err.response.data.message || "Something went wrong");
  }

  document.getElementById("forgot-email").value = "";
}

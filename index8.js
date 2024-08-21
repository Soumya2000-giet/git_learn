// const form_e = document.querySelector('form')

// function handleFormSubmit(event){
//     event.preventDefault()
//     const name_e = document.getElementById('username')
//     localStorage.setItem("Username", name_e.value);

//     const email_e = document.getElementById('email')
//     localStorage.setItem("Email", email_e.value);

//     const phone_e = document.getElementById('phoneno')
//     localStorage.setItem("Phone", phone_e.value);
// }

// form_e.addEventListener('submit', handleFormSubmit)


const form_e = document.querySelector('form')

function handleFormSubmit(event) {
  event.preventDefault()
  const name_e = document.getElementById('username')
  localStorage.setItem("Username", name_e.value);

  const email_e = document.getElementById('email')
  localStorage.setItem("Email", email_e.value);

  const phone_e = document.getElementById('phoneno')
  localStorage.setItem("Phone", phone_e.value);
}

form_e.addEventListener('submit', handleFormSubmit)
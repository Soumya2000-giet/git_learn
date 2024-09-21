
function handleFormSubmit(event){
    event.preventDefault()
    const user_name = document.querySelector('#username')
    const user_email = document.querySelector('#email')
    const user_phone = document.querySelector('#phone')

    let user_details = {
        "username" : user_name.value ,
        "email" : user_email.value,
        "user_phone" : user_phone.value
    }
    
     const user_details_sereialized = JSON.stringify(user_details)
     
     localStorage.setItem(user_name.value,user_details_sereialized)


}
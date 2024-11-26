function handleFormSubmit(event){
    event.preventDefault();
    const user_name = event.target.username.value
    const user_email = event.target.email.value
    const user_phone_no = event.target.phone.value

    const user_obj = {
        user_name,
        user_email,
        user_phone_no
    }

    localStorage.setItem(user_obj.user_name, JSON.stringify(user_obj))
    show_user_details(user_obj)


    function show_user_details(user_obj){
        const u_l = document.getElementById('memberlist')
        li_item=document.createElement('li')
        li_item.textContent=user_obj.user_name + ' - ' + user_obj.user_email + ' - ' + user_obj.user_phone_no
        u_l.appendChild(li_item)
    }

}



// const b_e = document.querySelector('form')
// b_e.addEventListener('submit', function handleFormSubmit(event){
//     event.preventDefault();
//     const user_name = event.target.username.value
//     const user_email = event.target.email.value
//     const user_phone_no = event.target.phone.value

//     const user_obj ={
//         user_name,
//         user_email,
//         user_phone_no
//     }

//     localStorage.setItem(user_obj.user_name, JSON.stringify(user_obj))
//     show_user_details(user_obj)


//     function show_user_details(user_obj){
//         const u_l = document.getElementById('memberlist')
//         li_item=document.createElement('li')
//         li_item.textContent=user_obj.user_name + ' - ' + user_obj.user_email + ' - ' + user_obj.user_phone_no
//         u_l.appendChild(li_item)
//     }

// }
// )






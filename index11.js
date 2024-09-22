function handleFormSubmit(event){
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const user_obj ={
        username,
        email,
        phone
    }

    localStorage.setItem(user_obj.email, JSON.stringify(user_obj));

    show_user_details(user_obj);
    // event.target.username.value = '';
    // event.target.email.value = '';
    // event.target.phone.value = '';


    function show_user_details(user_obj){
        const u_l = document.querySelector('ul');
        const li_item=document.createElement('li');
        li_item.textContent=user_obj.username + ' - ' + user_obj.email + ' - ' + user_obj.phone ;
        const del_button = document.createElement('button');
        del_button.textContent = 'Delete';
        del_button.addEventListener('click',function(evenet){
            u_l.removeChild(li_item);
            localStorage.removeItem(user_obj.email);
        })
        const edit_button = document.createElement('button');
        edit_button.textContent = 'Edit';
        edit_button.addEventListener('click',function(event){
            localStorage.removeItem(user_obj.email);
            const name_e = document.querySelector('#username')
            name_e.value =username
            const email_e=document.querySelector('#email')
            email_e.value=email
            const phone_e=document.querySelector('#phone')
            phone_e.value=phone

            u_l.removeChild(li_item) 
        })
        li_item.appendChild(del_button)
        li_item.appendChild(edit_button)
        u_l.appendChild(li_item) ;
    }

}

//  module.exports = handleFormSubmit;



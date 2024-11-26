// function handleFormSubmit(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;   


  const user_obj = {
    username,
    email,
    phone,
  };

  localStorage.setItem(user_obj.email, JSON.stringify(user_obj));
  show_user_details(user_obj);
}

function show_user_details(user_obj) {
  const user_list = document.querySelector('ul');
  user_list.classList.add("UserList"); // Using classList for better class manipulation

  const li_item = document.createElement('li');
  li_item.classList.add('Users');
  li_item.textContent = `${user_obj.username} - ${user_obj.email} - ${user_obj.phone}`;

  const del_button = document.createElement('button');
  del_button.textContent = 'Delete';

  // Add event listener to the delete button directly
  del_button.addEventListener('click', function(event) {
    // Remove the list item from the DOM
    li_item.remove();

    // Remove the corresponding data from localStorage
    localStorage.removeItem(user_obj.email);
  });

  li_item.appendChild(del_button);
  user_list.appendChild(li_item);
}
const form_mod = document.querySelector('form')
const class_mod = document.querySelector('.fruits')

const add_fruits = document.querySelectorAll('.fruit')



for(let i=0; i<add_fruits.length; i++){
    const new_btn =document.createElement('button')
    new_btn.className='edit-btn'
    new_btn.innerHTML='Edit'
    add_fruits[i].appendChild(new_btn);
}


form_mod.addEventListener('submit', function(event){
    event.preventDefault();
    const input_val = document.querySelector('#fruit-to-add')
    const new_element = document.createElement('li')
    new_element.innerHTML=input_val.value + '<button class="delete-btn">x</button>'
    const new_btn =document.createElement('button')
    new_btn.className='edit-btn'
    new_btn.innerHTML='Edit'
    new_element.appendChild(new_btn)
    class_mod.appendChild(new_element)
})
class_mod.addEventListener('click', function(event){
    if(event.target.classList.contains('delete-btn')){
        const del_fruits = event.target.parentElement;
        class_mod.removeChild(del_fruits)
    }
})

 



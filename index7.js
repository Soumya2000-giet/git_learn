const form_e = document.querySelector('form')
const btn = document.querySelector('button')
const fruit_add = document.querySelector('.fruits')

const new_input = document.createElement('input')
new_input.id="description"
new_input.type="text"

form_e.insertBefore(new_input, btn)

form_e.addEventListener('submit', function(event){

    const fruit_e = document.querySelector('#fruit-to-add')
    const desc_e = document.querySelector("#description")
    
    if (fruit_e){
        const new_li = document.createElement('li')
        new_li.innerHTML=fruit_e.value+`<br><p>${desc_e.value}<p>`+'<button class="delete-btn">x</button>'
        fruit_add.appendChild(new_li)
    }


})

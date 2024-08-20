const form_e = document.querySelector('form')
const btn = document.querySelector('button')
const fruit_add = document.querySelector('.fruits')


const new_input = document.createElement('input')
new_input.id="description"
new_input.type="text"

form_e.insertBefore(new_input, btn)

form_e.addEventListener('submit', function(event){
    event.preventDefault();
    const fruit_e = document.querySelector('#fruit-to-add')
    const desc_e = document.querySelector("#description")
    
    if (fruit_e){
        const new_li = document.createElement('li')

        new_li.className="fruit"
        new_li.innerHTML=`${fruit_e.value}<br><p style ='font-style: italic;'>${desc_e.value}</p><button class="delete-btn">x</button>`
        fruit_add.appendChild(new_li)
        console.log(fruit_add)
        fruit_e.value = "";
        desc_e.value = "";
    }


})

fruit_add.addEventListener('click', function(event){
    if(event.target.classList.contains('delete-btn')){
        const del_fruits = event.target.parentElement;
        fruit_add.removeChild(del_fruits)
    }
})

// implementing filter functionality
const filter = document.querySelector('#filter')
filter.addEventListener('keyup', function(event){
    const s_e = event.target.value.toLowerCase()
    const all_f_e = document.getElementsByClassName("fruit");
    for(let i=0 ; i<all_f_e.length;i++){
        const fruitName = all_f_e[i].firstChild.textContent.toLowerCase();
        let fruitDesc = ""
        try{
            fruitDesc = all_f_e[i].querySelector('p').textContent.toLowerCase();
           
        }
        catch(error)
        {
            console.log("no description")
        }
        

        if((fruitName.indexOf(s_e) === -1) && (fruitDesc.indexOf(s_e) === -1)){
            all_f_e[i].style.display='none';
           
        }
        else{
            all_f_e[i].style.display='flex'

        }
    }

})

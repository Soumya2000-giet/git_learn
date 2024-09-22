form_e = document.getElementById('expenseform')

form_e.addEventListener('submit',function(event){
    event.preventDefault();
    const amount =event.target.amount.value
    const description = event.target.desc.value
    const expense_category =  event.target.expense_type.value

    const user_obj ={
        amount ,
        description,
        expense_category
    }
    localStorage.setItem(expense_category,JSON.stringify(user_obj))
    show_expense_details(user_obj)


    function show_expense_details(user_obj){
        const ul_item = document.querySelector('ul')
        const li_element = document.createElement('li')
        li_element.textContent=user_obj.amount + '-'+ user_obj.description + '-' + user_obj.expense_category
        const del_btn = document.createElement('button')
        del_btn.textContent="Delete"
        del_btn.addEventListener('click',function(event){
            ul_item.removeChild(li_element)
            localStorage.removeItem(user_obj.expense_category)
        })
        const edit_btn = document.createElement('button')
        edit_btn.textContent="Edit"
        edit_btn.addEventListener('click',function(event){
            localStorage.removeItem(user_obj.expense_category)
            const amount_e = document.querySelector('#amount')
            amount_e.value = amount 
            const description_e = document.querySelector('#desc')
            description_e.value = description
            const expense_type_e = document.querySelector('#expense_type')
            expense_type_e.value = expense_category
            ul_item.removeChild(li_element)

        })
        li_element.appendChild(del_btn)
        li_element.appendChild(edit_btn)
        ul_item.appendChild(li_element)

    }
   

    
    
})
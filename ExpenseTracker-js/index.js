form_e = document.getElementById('expenseform')

form_e.addEventListener('submit',function(event){
    event.preventDefault();
    const amount =event.target.amount.value
    const description = event.target.desc.value
    const expense_category =  event.target.expense_type.value
    
})

  function handleFormSubmit(event) {
    event.preventDefault();
    const ExpenseDetails = {
      amount: event.target.amount.value,
      desc: event.target.desc.value,
      expense_type: event.target.expense_type.value,
    };
    axios
      .post(
        "http://localhost:3000/Expenses/addExpense",
        ExpenseDetails
      )
      .then((response) => displayExpenseOnScreen(response.data.data))
      .catch((error) => console.log(error));
    
    // Clearing the input fields
    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("expense_type").value = "";
  }

window.addEventListener('DOMContentLoaded',function(){
    axios.get("http://localhost:3000/Expenses/getExpense")
.then((response) =>{
  console.log(response.data)
    for(var i=0;i<response.data.data.length;i++){
      console.log(response.data.data[i])
        displayExpenseOnScreen(response.data.data[i])
    }
})
.catch((error)=>{
    console.log(error)
})  

})



function displayExpenseOnScreen(ExpenseDetails) {
    const expenseItem = document.createElement("li");
    expenseItem.appendChild(
      document.createTextNode(
        `${ExpenseDetails.amount} - ${ExpenseDetails.desc} - ${ExpenseDetails.expense_type}`
      )
    );

    // Create Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    expenseItem.appendChild(deleteBtn);

    // Create Edit Button
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    expenseItem.appendChild(editBtn);

    const expenseList = document.querySelector("ul");
    expenseList.appendChild(expenseItem);

    // Delete Button Event Listener
    deleteBtn.addEventListener("click", function (event) {
        axios.delete(`http://localhost:3000/Expenses/deleteExpense/${ExpenseDetails.id}`)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
      expenseList.removeChild(event.target.parentElement);
     
     
    });

    // Edit Button Event Listener
    editBtn.addEventListener("click", function (event) {
        
      expenseList.removeChild(event.target.parentElement);
      axios.delete(`http://localhost:3000/Expenses/deleteExpense/${ExpenseDetails.id}`)
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
      document.getElementById("amount").value = ExpenseDetails.amount;
      document.getElementById("desc").value = ExpenseDetails.desc;
      document.getElementById("expense_type").value = ExpenseDetails.expense_type;
    });
}

  
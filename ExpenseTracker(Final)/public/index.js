
  function handleFormSubmit(event) {
    event.preventDefault();
    const ExpenseDetails = {
      amount: event.target.amount.value,
      desc: event.target.desc.value,
      expense_type: event.target.expense_type.value,
    };
    const token = localStorage.getItem('token')
    console.log(token)
    axios
      .post(
        "http://localhost:3000/Expenses/addExpense",
        ExpenseDetails,{headers : {'Authorization' : token}}
      )
      .then((response) => displayExpenseOnScreen(response.data.data))
      .catch((error) => console.log(error));
    
    // Clearing the input fields
    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("expense_type").value = "";
  }

window.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');

    console.log(`line no 28 token value is ${token}`)

    // -------------------------------
    // 1. CHECK IF CASHFREE REDIRECTED BACK
    // -------------------------------
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("order_id");

    if (orderId) {
        console.log("Cashfree redirect detected. Checking payment status...");

        try {
            const response = await axios.get(
                `http://localhost:3000/payment/payment-status/${orderId}`
            );

            if (response.data === "Success") {
                localStorage.setItem("premiumUser", "true");
                showPremiumFeatures();
                alert("Payment Successful! You are now a Premium User.");
            } else {
                alert("Payment failed or pending. Please try again.");
            }
        } catch (err) {
            console.log("Error while checking payment:", err);
        }
    }

    // -------------------------------
    // 2. LOAD EXPENSES (original code)
    // -------------------------------
    try {
        const response = await axios.get(
            "http://localhost:3000/Expenses/getExpense",
            { headers: { Authorization: token } }
        );

        for (let i = 0; i < response.data.data.length; i++) {
            displayExpenseOnScreen(response.data.data[i]);
        }
    } catch (error) {
        console.log(error);
    }
});




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
      const token = localStorage.getItem('token')
        axios.delete(`http://localhost:3000/Expenses/deleteExpense/${ExpenseDetails.id}`,{headers : {'Authorization' : token}})
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
      const token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/Expenses/deleteExpense/${ExpenseDetails.id}`,{headers : {'Authorization' : token}})
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


//cashfree implementation 


const cashfree = Cashfree({ mode: "sandbox" });


document.getElementById("premiumBtn").addEventListener("click", async () => {
    try {

        const token = localStorage.getItem('token');

        console.log(`line no 140 ${token}`)

        const result = await axios.post(
            "http://localhost:3000/payment/pay",
            {},
             { headers: { Authorization: token } }
        );

        const paymentSessionId = result.data.paymentSessionId;
        const orderId = result.data.orderId;

        cashfree.checkout({
            paymentSessionId: paymentSessionId,
            redirectTarget: "_self"
        });

        // Poll API to check payment status after redirect
        checkPaymentStatus(orderId);

    } catch (err) {
        console.error("Payment Error:", err);
        alert("Error in starting payment.");
    }
});



async function checkPaymentStatus(orderId) {
    setTimeout(async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/payment/payment-status/${orderId}`
            );

            if (response.data === "Success") {
                localStorage.setItem("premiumUser", "true");
                showPremiumFeatures();
            }
        } catch (err) {
            console.log("Still waiting for payment confirmation...");
        }
    }, 4000);
}

function showPremiumFeatures() {
    document.getElementById("premiumMsg").textContent =
        " You are a Premium User!";
    document.getElementById("leaderboardBtn").style.display = "block";
}
  
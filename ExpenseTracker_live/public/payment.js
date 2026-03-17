const cashfree = Cashfree({
    mode: "sandbox",
});

document.getElementById("renderBtn").addEventListener("click", async () => {  
    try {
        const result = await axios.post("/payment/pay");
        
        // Backend sends { paymentSessionId, orderId }
        const payment_session_id = result.data.paymentSessionId;

        if (!payment_session_id) {
            alert("Failed to get payment session ID");
            return;
        }

        let checkoutOptions = {
            paymentSessionId: payment_session_id,
            redirectTarget: "_self", // Open in same tab
        };

        // Open Cashfree checkout
        cashfree.checkout(checkoutOptions);

    } catch (err) {
        console.error(`error in line 26 : ${err}`);
        alert("Payment error. Check console.");
    }
});

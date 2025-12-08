const { Cashfree, CFEnvironment } = require("cashfree-pg");


const cashfree = new Cashfree(CFEnvironment.SANDBOX, "TEST430329ae80e0f32e41a393d78b923034", "TESTaf195616268bd6202eeb3bf8dc458956e7192a85");



const createorder = async(
    orderId,
    orderAmount,
    orderCurrency = "INR",
    customerID,
    customerPhone,


)=>{

 try{   
const expiryDate = new Date(Date.now() + 60*60*1000)

const formattedexpiryDate = expiryDate.toISOString()

const request = {
    "order_amount":  orderAmount,
    "order_currency": orderCurrency,
    "order_id": orderId,
    "customer_details": {
        "customer_id": customerID,
        "customer_phone": customerPhone
    },
    "order_meta": {
        "return_url": `http://localhost:3000/index.html?order_id=${orderId}`,
        //"return_url": `http://localhost:3000/payment/payment-status/${orderId}`,
        //  "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}",
         "payment_methods": "cc,dc,upi,nb,app"
    },
     "order_expiry_time": formattedexpiryDate
}

// cashfree.PGCreateOrder(request).then((response) => {
//     console.log('Order created successfully:',response.data);
// }).catch((error) => {
//     console.error('Error:', error.response.data.message);
// });

const response = await cashfree.PGCreateOrder(request)


return response.data.payment_session_id
 }

 

 catch(err){

    console.error("error in creating order :", err)
 }


}

const getPaymentStatus = async (orderId) =>{
    try{

        const response = await cashfree.PGOrderFetchPayments(orderId)

        let getOrderResponse = response.data

        let orderStatus;


        if (getOrderResponse.filter(transaction => transaction.payment_status === "SUCCESS").length > 0) {
            orderStatus = "Success"
        } 
        else if (getOrderResponse.filter(transaction => transaction.payment_status === "PENDING").length > 0) {
            orderStatus = "Pending"
        } 
        else {
            orderStatus = "Failure"
        }

        return orderStatus

    }

    catch(err){
        console.log(err)
    }
}




module.exports = { createorder, getPaymentStatus };
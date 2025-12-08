const { createorder, getPaymentStatus}  = require('../services/cashfreeServices.js')



const payment_model = require('../models/payment_model.js')


const process_payment = async(req, res)=>{


    const orderId = "ORDER" + Date.now();

    const orderAmount = 2000 

    const orderCurrency = "INR"

    const customerID = "1"

    const customerPhone = "9999999999"


    try{
        const paymentSessionId = await createorder(
            orderId,
            orderAmount,
            orderCurrency ,
            customerID,
            customerPhone
        )


        await payment_model.create({
            orderId,
            paymentSessionId,
            orderAmount,
            orderCurrency,
            paymentStatus : "Pending"
        })

        res.json({paymentSessionId, orderId})

    }

    catch(err){
        console.error(err)
        res.status(500).json({message :"Error in processing payment"})
    }
}

// const payment_status = async(req, res) =>{


// }

const payment_status = async(req , res) =>{


    const {orderId}= req.params


    try{
        const orderStatus = await getPaymentStatus(orderId)



        await payment_model.update(
            { paymentStatus: orderStatus },
            { where: { orderId } }
        );


        res.json(orderStatus)

    }
    catch(err){
         console.error(err)
        res.status(500).json({message :"Error in getting payment status"})
    }
}


module.exports = {process_payment, payment_status}
const express = require('express')

const p_router = express.Router()

const payment_controller = require("../controllers/payment_controller")


p_router.post('/pay',payment_controller.process_payment)

p_router.get('/payment-status/:orderId', payment_controller.payment_status);


module.exports = p_router
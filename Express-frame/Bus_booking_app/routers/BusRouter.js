const express = require('express')

const b_router = express.Router()


const BusController = require('../controllers/bus_controller')



b_router.get('/available/:seats',BusController.get_bus)

b_router.post('/addbus',BusController.add_bus)

b_router.get('/:id/bookings',BusController.get_bus_booking)


module.exports = b_router






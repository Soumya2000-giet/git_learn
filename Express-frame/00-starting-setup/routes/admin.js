const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const productcontroller = require('../controllers/product');



// /admin/add-product => GET
router.get('/add-product', productcontroller.getProduct);

// /admin/add-product => POST
router.post('/add-product',productcontroller.addProduct);

module.exports = router


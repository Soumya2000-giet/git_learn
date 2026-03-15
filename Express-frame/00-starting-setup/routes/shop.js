const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');
const productcontroller = require('../controllers/product');

const router = express.Router();

router.get('/', productcontroller.addshopdata);

module.exports = router;

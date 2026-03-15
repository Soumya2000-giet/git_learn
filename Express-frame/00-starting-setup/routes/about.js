const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const about_us_controller = require('../controllers/about_us')

// /admin/add-product => GET
router.get('/about-us', about_us_controller.getAboutUs);

// /admin/add-product => POST
router.post('/about-us', about_us_controller.postAboutUs);

// router.get('/admin/success',  about_us_controller.getSuccessPage);

module.exports = router;

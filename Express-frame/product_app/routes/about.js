const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => GET
router.get('/about-us', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'about-us.html'));
});

// /admin/add-product => POST
router.post('/about-us', (req, res, next) => {
  console.log(req.body);
  res.redirect('/admin/success');
});

// router.get('/admin/success', (req, res, next) => {
//   res.send('<h1>Form successfuly filled</h1>');
// });

module.exports = router;

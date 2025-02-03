const rootDir = require('../util/path');

exports.getAboutUs = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'about-us.ejs'));
    res.render('about-us', {
        pageTitle: 'About us',
        path: '/admin/about-us',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
  }
  
exports.postAboutUs = (req, res, next) => {
    console.log(req.body);
    res.redirect('/admin/success');
  }  

exports.getSuccessPage = (req, res, next) => {
    res.send('<h1>Form successfuly filled</h1>');
  }  
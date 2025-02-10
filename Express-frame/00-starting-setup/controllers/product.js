const product = require('../models/product')
exports.getProduct =(req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

exports.addProduct = (req, res, next) => {
    const new_prod = new product(req.body.title);
    new_prod.save()
    // products.push({ title: req.body.title });
    console.log("product added")
    res.redirect('/');
  }  

exports.addshopdata = (req, res, next) => {
    product.fetch(products=>{
      console.log("product fetching successful")
    console.log(products)
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
    })
    
  }  
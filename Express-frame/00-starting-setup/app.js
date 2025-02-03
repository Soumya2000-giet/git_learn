const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminDataRouter = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorpage = require('./controllers/e404')
const aboutUsRoutes = require('./routes/about');
const about_us_controller = require('./controllers/about_us');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminDataRouter);
app.use(shopRoutes);
app.use('/admin',aboutUsRoutes);

app.get('/admin/success', about_us_controller.getSuccessPage);
app.use(errorpage.get404);

app.listen(3000);

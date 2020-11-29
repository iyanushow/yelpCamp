require("dotenv").config();
const express = require('express'),
    controller = require('./controllers/yelpController'),
    methodOveride = require('method-override'),
    seedDB = require('./seeds'),
    app = express();
    

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(methodOveride('_method'))
// seedDB();
controller(app);

const port = process.env.PORT || 3000

app.listen(port,function(){
    console.log('server running');
});   
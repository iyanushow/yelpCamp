"use strict";

var express = require('express'),
    controller = require('./controllers/yelpController'),
    methodOveride = require('method-override'),
    seedDB = require('./seeds'),
    app = express();

app.set('view engine', 'ejs');
app.use(express["static"]('./public'));
app.use(methodOveride('_method')); // seedDB();

controller(app);
app.listen(3000, process.env.PORT, process.env.IP, function () {
  console.log('server running');
});
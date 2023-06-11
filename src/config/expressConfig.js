const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware')

function expressConfig(app) {

    // express config -use - middleware express.static -access to css and img
    app.use(express.static(path.resolve(__dirname, '../public')));
    
    //add data from user input in req.body and parse to object query string
    app.use(express.urlencoded({extended:false}));
// setup cookie -parser
    app.use(cookieParser());
    app.use(auth)

}
module.exports = expressConfig;
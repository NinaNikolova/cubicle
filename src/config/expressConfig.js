const express = require('express');
const path = require('path')
function expressConfig(app) {

    // express config -use - middleware express.static -access to css and img
    app.use(express.static(path.resolve(__dirname, '../public')));
    //add data from user input in req.body
    app.use(express.urlencoded({extended:false}))

}
module.exports = expressConfig;
const express = require('express');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const homeController = require('./controllers/homeController')
const cubeController =require('./controllers/cubeController')


const app = express();
const PORT = 5000;



expressConfig(app)
handlebarsConfig(app)

// Routes as middlewares -modular routes

app.use(homeController)
// work only if path req starts with '/cubes'
app.use('/cubes', cubeController)

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}...`));
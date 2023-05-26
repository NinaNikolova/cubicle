const router = require('express').Router();
const homeController = require('./controllers/homeController')
const cubeController =require('./controllers/cubeController')
// Routes as middlewares -modular routes

router.use(homeController)
// work only if path req starts with '/cubes'
router.use('/cubes', cubeController)
router.get("*", (req, res)=>{
    res.redirect(404)
})

module.exports = router;
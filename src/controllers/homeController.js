// this is new instance of Router in Express
const router = require('express').Router();
const cubeManager = require('../managers/cubeManager')

router.get('/', (req, res)=>{
    const cubes = cubeManager.getAll();

    // render function  pass the cubes to 'index'-template like property cubes with cubes-array 
    res.render('index', {cubes})
});

router.get('/about', (req, res)=>{
    res.render('about')
});

router.get('/404', (req, res)=>{
    res.render('404')
});
module.exports=router;
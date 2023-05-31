// this is new instance of Router in Express
const router = require('express').Router();
const cubeManager = require('../managers/cubeManager')

router.get('/', async (req, res)=>{
    const{search, from, to}=req.query;
    const cubes = await cubeManager.getAll(search, from, to);

// req.body - podadena na render data
// req.query - querystring - all after ? before # Example: { search: 'gan', from: '1', to: '3' }
// req.params.id -in routes /:id
//     render function  pass the cubes to 'index'-template like property cubes with cubes-array 

    res.render('index', { cubes, search, from, to})
});

router.get('/about', (req, res)=>{
    res.render('about')
});

router.get('/404', (req, res)=>{
    res.render('404')
});
module.exports=router;
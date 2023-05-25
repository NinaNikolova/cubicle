const router = require('express').Router();

// '/create' means '/cubes/create' -> '/cubes' comes from app.use('/cubes',cubeController) in index
router.get('/create', (req, res)=>{
    res.render('create')
});
router.post('/create', (req, res)=>{
    console.log(req.body);

    res.redirect('/')
})


module.exports = router;
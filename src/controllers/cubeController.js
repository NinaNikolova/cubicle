const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');

// '/create' means '/cubes/create' -> '/cubes' comes from app.use('/cubes',cubeController) in index
router.get('/create', (req, res) => {
    console.log(cubeManager.getAll())
    res.render('create')
});
router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    cubeManager.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel) });
    res.redirect('/')
});
router.get('/:cubeId/details', (req, res) => {
    const cubeId=req.params.cubeId;
    const cube = cubeManager.getOne(cubeId);

    res.render('details', cube)
})


module.exports = router;
const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');

// '/create' means '/cubes/create' -> '/cubes' comes from app.use('/cubes',cubeController) in index
router.get('/create', async (req, res) => {
  
    res.render('create')
});
router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    await cubeManager.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel) });
    res.redirect('/')
});
router.get('/:cubeId/details', async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeManager.getOne(cubeId);
    if (!cube) {
        res.redirect('/404')
    }

    res.render('details', cube)
})


module.exports = router;
const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager=require('../managers/accessoryManager')
// cubController with inport of two managers
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

router.get('/:cubeId/attach-accessory', async(req, res)=>{
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getAll().lean()
 
    res.render('accessory/attach', {cube, accessories})
})


module.exports = router;
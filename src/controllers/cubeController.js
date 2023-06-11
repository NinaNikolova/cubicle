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
     // we have to save info about owner - owner: req.user._id
    await cubeManager.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel), owner: req.user._id});
    res.redirect('/')
});
router.get('/:cubeId/details', async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeManager.getOneWithAccessories(cubeId).lean();
    
    console.log(cube)
    if (!cube) {
        res.redirect('/404')
    }

    res.render('details', cube)
})

router.get('/:cubeId/attach-accessory', async(req, res)=>{
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getOthers(cube.accessories).lean()
 const hasAccessories = accessories.length>0
    res.render('accessory/attach', {cube, accessories, hasAccessories})
})

router.post('/:cubeId/attach-accessory', async(req,res)=>{
    const{accessory:accessoryId} =req.body;
    console.log(accessoryId)
    const cubeId = req.params.cubeId;
   await cubeManager.attachAccessory(cubeId, accessoryId);
   res.redirect(`/cubes/${cubeId}/details`)
})


module.exports = router;
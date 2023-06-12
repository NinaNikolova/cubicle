const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const {getDifficultyOptionsViewData} =require('../utils/viewHelpers')
const {isAuth}=require('../middlewares/authMiddleware')
// cubController with inport of two managers
// '/create' means '/cubes/create' -> '/cubes' comes from app.use('/cubes',cubeController) in index
router.get('/create',isAuth, async (req, res) => {
    let cube = await cubeManager.getOne(req.params.cubeId).lean();
    if(cube.owner!=req.user?._id){
        return res.redirect('/404')
    }
    res.render('cube/create')
});
router.post('/create',isAuth, async (req, res) => {
    let cube = await cubeManager.getOne(req.params.cubeId).lean();
    if(cube.owner!=req.user?._id){
        return res.redirect('/404')
    }
    const { name, description, imageUrl, difficultyLevel } = req.body;
    // we have to save info about owner - owner: req.user._id
    await cubeManager.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel), owner: req.user._id });
    res.redirect('/')
});
router.get('/:cubeId/details', async (req, res) => {
    const cubeId = req.params.cubeId;

    const cube = await cubeManager.getOneWithAccessories(cubeId).lean();
 
    if (!cube) {
        res.redirect('/404')
    }
    const isOwner = cube.owner== req.user?._id;

    res.render('cube/details', {cube, isOwner})
})

router.get('/:cubeId/attach-accessory',isAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    
    if(cube.owner!=req.user?._id){
        return res.redirect('/404')
    }
    const accessories = await accessoryManager.getOthers(cube.accessories).lean()
    const hasAccessories = accessories.length > 0
    res.render('accessory/attach', { cube, accessories, hasAccessories })
})

router.post('/:cubeId/attach-accessory', isAuth, async (req, res) => {
    const { accessory: accessoryId } = req.body;
    let cube = await cubeManager.getOne(req.params.cubeId).lean();
    if(cube.owner!=req.user?._id){
        return res.redirect('/404')
    }
    const cubeId = req.params.cubeId;
    await cubeManager.attachAccessory(cubeId, accessoryId);
    res.redirect(`/cubes/${cubeId}/details`)
})
router.get('/:cubeId/delete', isAuth, async (req, res) => {
    // when we try to give handlebars mongoose document, we need to use --> lean()

    let cube = await cubeManager.getOne(req.params.cubeId).lean();
        if(cube.owner!=req.user?._id){
        return res.redirect('/404')
    }
const options = getDifficultyOptionsViewData(cube.difficultyLevel)
    res.render('cube/delete', { cube, options })
});
router.post('/:cubeId/delete', isAuth, async (req, res) => {
    // when we try to give handlebars mongoose document, we need to use --> lean()
    let cube = await cubeManager.getOne(req.params.cubeId).lean();
    if(cube.owner!=req.user?._id){
        return res.redirect('/404')
    }
    await cubeManager.delete(req.params.cubeId);

    res.redirect('/')
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {
    // when we try to give handlebars mongoose document, we need to use --> lean()
    let cube = await cubeManager.getOne(req.params.cubeId).lean();
    if(cube.owner!=req.user?._id){
        return res.redirect('/404')
    }
const options = getDifficultyOptionsViewData(cube.difficultyLevel)
    res.render('cube/edit', { cube, options })
});
router.post('/:cubeId/edit', isAuth, async (req, res) => {
    // when we try to give handlebars mongoose document, we need to use --> lean()
    let cube = await cubeManager.getOne(req.params.cubeId).lean();
    if(cube.owner!=req.user?._id){
        return res.redirect('/404')
    }
    let cubeId = req.params.cubeId;
    let cubeData = req.body;

    await cubeManager.update(cubeId, cubeData)
    res.redirect(`/cubes/${cubeId}/details`)
});



module.exports = router;
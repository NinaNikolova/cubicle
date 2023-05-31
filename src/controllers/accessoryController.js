const router = require('express').Router();
router.get('/create', (req, res)=>{
    res.render('accessory/create');
})
router.post('/create', (req, res)=>{
    const {name, imageUrl, description}= req.body;
    
    // TODO: add accessory data to db
    res.redirect('/')
})
module.exports=router;
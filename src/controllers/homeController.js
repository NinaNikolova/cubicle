const router = require('express').Router();
// this is new instance of Router in Express

router.get('/', (req, res)=>{
    res.render('index')
});

router.get('/about', (req, res)=>{
    res.render('about')
});
module.exports=router;
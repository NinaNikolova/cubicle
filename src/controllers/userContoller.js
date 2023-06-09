const router = require('express').Router();

// /user is in routes file pointed
router.get('/register', (req, res) => {
    res.render('users/register')
})
router.get('/login', (req, res) => {
    res.render('users/login')
})


module.exports = router;
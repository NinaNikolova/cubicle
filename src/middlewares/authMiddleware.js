// middleware for when we have req to server -> to know if token is valid

const jwt = require('../lib/jwt')
const { SECRET } = require('../config/config')
exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];
    if (token) {
        // validate token
        try {

            const payload = await jwt.verify(token, SECRET);
            // !!! we atach user to req laike payload or decoded token
            req.user = payload;
            // res.locals are variables wich can be acessed in views
            res.locals.user = payload;
            res.locals.isAuthenticated = true;
            next();
        } catch (err) {
            res.clearCookie('auth')
            res.redirect('/users/login')
        }
    } else {
        next()

    }

}
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login')
    }
    next()
}
const {promisify} = require('util');
const jsonwebtoken =require('jsonwebtoken');


// jwt haven't promise syntax -->util - change from synk to async
const jwt = {
    sign: promisify(jsonwebtoken.sign),
    verify: promisify(jsonwebtoken.verify)
}
module.exports=jwt;
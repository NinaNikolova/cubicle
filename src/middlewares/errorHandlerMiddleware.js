const {extractErrorMessages}= require('../utils/errorHelpers')
module.exports =(err, req, res, next)=>{
    const errorMessages = extractErrorMessages(err)
    res.redirect('404', {errorMessages})
}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: String,
    // heshiran password
    password: String,

})
// TODO: validate if user exits
userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Password missmatch');
        }
    })
    // s tozi hook se zakachame predi save in db
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
})
const User = mongoose.model('User', userSchema);
module.exports = User;
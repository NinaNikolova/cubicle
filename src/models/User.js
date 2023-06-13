const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Username is required'],
        minLength:[ 5,'Password is too short!'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
        //  unique means that we want to have index amd fast search
        unique: true
    },
    // heshiran password
    password: {
        type: String,
        required: [true,'Password is required!'],
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9]+$/.test(value)
            },
            message: `Invalid password!`
        },
        minLength: 8,
    }

})
// TODO: validate if user exits
userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Password missmatch');
        }
    })
// s tozi hook se zakachame predi save in db
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
})
const User = mongoose.model('User', userSchema);
module.exports = User;
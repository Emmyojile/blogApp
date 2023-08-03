const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    username:{
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
}, 
{ timestamps: true }
);

UserSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    // this.confirmPassword = undefined
})

UserSchema.methods.comparePasswords = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

UserSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id, username: this.username}, process.env.JWT_SECRET, {expiresIn: '1d'});
}


module.exports = mongoose.model('User', UserSchema)

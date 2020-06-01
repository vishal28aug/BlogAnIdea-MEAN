const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    id:{
        type:String,
        required:[true, 'Please enter id']
    },
    firstName: {
        type: String,
        required: [true, 'Please enter name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter name']
    },
    userId: {
        type:String,
        required:[true,'Please enter email'],
        unique: true,
        match:[
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please add a valid email'
        ]
    },
    role:{
        type:String,
        enum:['user','publisher','admin'],
        default:'user'
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 6,
        select: false
    },
    profilePicturePath:{
        type:String,
        required:[true,'Please add a profile picture']
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Encrypt password using bcrypt
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this.id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};

//Gernrate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
    //Genrate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //Set expire
    this.resetPasswordExpire = Date.now() +10 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User',UserSchema);
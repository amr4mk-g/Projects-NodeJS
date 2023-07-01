const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

let schema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, unique: true, required: true, trim: true, lowercase: true,
        validate(v) { if (!validator.isEmail(v)) throw new Error('Email is invalid') }},
    password: {type: String, required: true, minlength: 7, trim: true},
    age: {type: Number, default: 0,
        validate(v) { if (v < 0) throw new Error('Age must be a positive number') }},
    avatar: {type: Buffer},
    tokens: [{ token:{type: String, required: true} }]
}, {timestamps: true})

schema.virtual('tasks', {ref: 'Task', localField: '_id', foreignField: 'user'})

schema.statics.findByCredentials = async (email, password) => {
    let user = await User.findOne({email})
    if (!user) throw new Error('Unable to login')
    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login')
    return user
}

schema.methods.generateToken = async function() {  
    let token = jwt.sign({_id: this._id.toString()}, 'secretKey', {expiresIn: "7d"}) 
    this.tokens.push({token})
    await this.save()
    return token
}

schema.methods.toJSON = function () {
    return {name: this.name, age: this.age, email: this.email}
}

schema.pre('save', async function (next) {
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10)
    next()
})

schema.pre('remove', async function (next) {
    await Task.deleteMany({user: this._id})
    next()
})

const User = mongoose.model('User', schema)
module.exports = User

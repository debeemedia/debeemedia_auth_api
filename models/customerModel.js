const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 10
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        trim: true
    }
})

// pre-save middleware for hashing and salting password
customerSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err)
        }
        this.password = hash
        next()
    })
})

const CustomerModel = mongoose.model('Customer', customerSchema)
module.exports = CustomerModel

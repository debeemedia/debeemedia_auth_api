require('dotenv').config()
const CustomerModel = require("../models/customerModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function login (req, res) {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(401).json({success: false, message: 'Email and password are required'})
        }
    
        const customer = await CustomerModel.findOne({email})
        // check if customer exists
        if (!customer) {
            return res.status(401).json({success: false, message: 'Customer does not exist'})
        }
    
        // compare password inputed with password in database
        bcrypt.compare(password, customer.password, (err, result) => {
            if (result === true) {
                // generate a JWT
                const token = jwt.sign({_id: customer._id, email: customer.email}, process.env.SECRET, {expiresIn: '1h'})
                return res.status(200).json({success: true, message: 'Login successful', token})
            } else {
                return res.status(401).json({success: false, message: 'Wrong password'})
            }
        })
        
    } catch (error) {
        console.log('Error', error)
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

module.exports = login
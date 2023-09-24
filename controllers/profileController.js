require("dotenv").config()
const CustomerModel = require("../models/customerModel");
const jwt = require('jsonwebtoken')

async function getProfile (req, res) {
    try {
        const token = req.headers.authorization
        // check if token was provided
        if (!token) {
            return res.status(401).json({success: false, message: 'No token provided'})
        }

        try {
            // verify the token provided with the secret key and pass the customer payload into a variable
            const decoded = jwt.verify(token, process.env.SECRET)
    
            const customerProfile = await CustomerModel.findById(decoded._id, '-password -__v')

            // check if customer exists
            if (!customerProfile) {
                return res.status(404).json({success: false, message: 'Profile not found'})
            }

            res.status(200).json({success: true, data: customerProfile})
            
        } catch (error) {
            // catch invalid or expired token error
            return res.status(401).json({success: false, message: 'Invalid or expired token'})
        }

    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

module.exports = getProfile

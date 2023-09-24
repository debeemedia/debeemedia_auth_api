const CustomerModel = require("../models/customerModel");

async function createCustomer (req, res) {
    try {
        const {email, password, first_name, last_name, gender} = req.body
    
        // check if email is valid
        if (email.length < 10) {
            return res.status(400).json({success: false, message: 'Please input a valid email'})
        }
        
        // check if required fields are filled
        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({success: false, message: 'Please fill out all the required fields'})
        }
        
        // check if customer exists
        const oldCustomer = await CustomerModel.findOne({email})
        if (oldCustomer) {
            return res.status(400).json({success: false, message: 'Email already exists'})
        }
        
        const customer = new CustomerModel({email, password, first_name, last_name, gender})
        const customerToSave = await customer.save()
        res.status(201).json({success: true, message: 'Customer created successfully', data: {email: customerToSave.email, first_name: customerToSave.first_name, last_name: customerToSave.last_name, gender: customerToSave.gender}})
        
    } catch (error) {
        console.log('Error', error)
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

module.exports = createCustomer

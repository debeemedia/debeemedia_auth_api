const express = require('express')
const createCustomer = require('../controllers/registerController')
const login = require('../controllers/loginController')
const getProfile = require('../controllers/profileController')
const router = express.Router()

// home /get
router.get('/', (req, res) => {
    res.status(200).json({success: true, message: 'Welcome to debeemedia auth api'})
})

// register /post
router.post('/register', createCustomer)

// login /post
router.post('/login', login)

// profile /ge
router.get('/profile', getProfile)


module.exports = router

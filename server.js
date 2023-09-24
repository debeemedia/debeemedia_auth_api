require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/route')

const app = express()

const port = process.env.PORT || 6006

// middleware
app.use(express.json())
app.use(router)

// connect database
mongoose.connect('mongodb://localhost:27017/debeemedia_auth_api')
const db = mongoose.connection
db.on('error', (err) => console.log('db failed to connect', err.message))
db.once('connected', () => console.log('db connected'))

app.listen(port, () => console.log(`server running on port ${port}`))

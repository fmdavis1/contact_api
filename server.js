const express = require('express')
const mongoConfig = require('./config/mongoConfig')
const contactsRouter = require('./routes/contactsRouter')
const usersRouter = require('./routes/usersRouter')
require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')


const app = express()
const PORT = 5000
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

//Routers

app.use('/contacts', contactsRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.status(200).json({message:'Welcome'})
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    mongoConfig()
})
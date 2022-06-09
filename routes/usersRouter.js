const express = require('express')
const UserModel = require('../models/userSchema')
const {check, validationResult} = require('express-validator')

//Create a Router
const router = express.Router()

//Create Router
router.post('/', [
    check('username',"Username is required!").notEmpty(),
    check('email',"Please use a valid email!").isEmail(),
    check('password', "Please enter a password.").notEmpty(),
    check('password', "Please enter a password with six or more characters.").isLength({min:6})
] ,async (req,res) => {
    const userData = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
         return res.json(errors.array())
    }
    try {
        const user = await UserModel.create(userData)
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json('Bad request!!!')
        
    }
})

module.exports = router
const express = require('express')
const ContactModel = require('../models/contactSchema')

//Create a Router
const router = express.Router()
//Get  Contacts
router.get('/', async(req, res) =>{
   
    try{
        const contacts = await ContactModel.find()
        res.status(200).json(contacts)
    }catch(error){
        console.log(error)
    }
})

//Create Contacts
router.post('/', async (req, res) => {
    const contactData = req.body  //gets data from the request

    try {
        const contact = await ContactModel.create(contactData)//creates the contact in the DB
        res.status(200).json(contact)
    } catch (error) {
        console.error(error)
        res.status(400).json('Bad request!')
    }
})

//Get contact by id

router.get('/:id', async(req, res) => {
    const id= req.params.id
    try {
        const contact = await ContactModel.findById(id)
        res.status(200).json(contact)
    } catch (error) {
        console.error(error)
        res.status(400).json({
            msg:'Id not found'
        })
        
    }
})

//Update contact by id
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newContactData = req.body
    try {
        //find the contact by id
        const contact = await ContactModel.findByIdAndUpdate(id, newContactData, {new: true})
        res.status(200).json(contact)
    } catch (error) {
        console.log(error)
        
    }

})

//Delete a contact

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const contact = await ContactModel.findByIdAndDelete(id)
        res.status(200).json({msg: 'Contact was deleted'})
    } catch (error) {
        console.log(error)
    }
})
module.exports = router
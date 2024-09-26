const express = require('express');
const Category = require('../models/CategoryModels');
const router = express.Router()

router.get('/', async (req, res) => {
    try {
       let category = await Category.find()
       res.json(category)
    }catch (err) {
        res.status(500).json({message: "error"})
    }
})


router.post('/create', async (req, res) => {
    const {category_name} = req.body
    try {
        const newCategory = new Category({
            category_name: category_name
        })
        await newCategory.save()
        res.status(201).json(newCategory)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})



router.delete('/delete', async (req, res) => {
    const {id} = req.body
    try {
        await Category.findByIdAndDelete(id)
        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})



module.exports = router
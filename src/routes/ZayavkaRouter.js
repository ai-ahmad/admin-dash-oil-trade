const express = require('express');
const ZayavkaModel = require('../models/ZayavkaModel');
const router = express.Router();



router.get('/', async(req,res) => {
    try {
        const Zayavka = ZayavkaModel.findMany()
        res.status(200).json({'message': "get all date successfully", "data": Zayavka})
    }catch (err) {
        res.status(500).json({'message': "Error get all date", "error": err.message})
    }
})



router.post('/create', async(req, res) => {
    const {name, phone, email, comment} = req.body
    try {
        const newZayavka = new ZayavkaModel({name, phone, email, comment})
        await newZayavka.save()
        res.status(201).json({'message': "Zayavka created successfully", "data": newZayavka})
    }catch (err) {
        res.status(500).json({'message': "Error create Zayavka", "error": err.message})
    }
})
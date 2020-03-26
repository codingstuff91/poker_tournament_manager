const express = require('express')
const Tournament = require('../models/Tournament')

const router = express.Router()

// Create a new tournament
router.post('/tournament/add', async (req,res)=>{
    res.send('create tournament route')
})

// Edit a tournament
router.patch('/tournament/edit',async(req,res)=>{
    res.send('Edit tournament route')
})

module.exports = router;
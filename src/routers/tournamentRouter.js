const express = require('express');
const Tournament = require('../models/Tournament');

const router = express.Router();

/**
 * View to add a tournament
 */
router.get('/tournament',(req,res)=>{
    res.render('tournaments/tournament_create')
})

/**
 * Store a new tournament
 */
router.post('/tournament', async (req, res) => {
    res.send('create tournament route');
});

/**
 * Edit a tournament
 */
router.patch('/tournament', async (req, res) => {
    res.send('Edit tournament route');
});

module.exports = router;
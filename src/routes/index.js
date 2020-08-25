const express = require('express');
const router = express.Router();

const Task = require("../models/task")

router.get('/', async (req, res) =>{
    const registros = await Task.find();
    res.render('index',{ registros});
});

router.post('/add', async (req, res) =>{
    const registros = new Task(req.body);
    await registros.save();
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) =>{
    const {id} = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});

module.exports = router;

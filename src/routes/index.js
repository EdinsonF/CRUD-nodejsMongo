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
    req.flash('mensaje', 'Registro exitoso');
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) =>{
    const {id} = req.params;
    await Task.remove({_id: id});
    req.flash('mensajeNo', 'Registro Eliminado');
    res.redirect('/');
});

router.get('/status/:id', async (req, res) =>{
    const {id} = req.params;
    const result = await Task.findById(id);
    result.estado = !result.estado;
    await result.save({result});
    req.flash('mensaje', 'Estado cambiado');
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) =>{
    const {id} = req.params;
    const result = await Task.findById(id);
    res.render('edit',{result});
});

router.post('/edit/:id', async (req, res) =>{
    const {id} = req.params;
    await Task.update({_id : id}, req.body);
    req.flash('mensaje', 'Registro actualizado');
    res.redirect('/');
});

module.exports = router;

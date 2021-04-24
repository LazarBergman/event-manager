const express = require('express');

const app = express.Router();
const repository = require('../repositories/userRepository');
const USERSTATE = require('../constants/userState');

app.put('/state/:id', async (req, res) => {
  try {
    const { state } = req.params;
    await repository.updateState(id, state);
    res.status(200).json([])
  } catch (e) {

  }
  
});

app.use(function (req, res, next) {
  if (req.user && req.user.state === USERSTATE.ADMIN) {
    next();
  } else {
    res.send('Access denied');
  }
});

app.get('/', async (req, res) => {
  try {
    const users = await repository.findAll()
    res.json(users);
  } catch (e) {}
});

app.post('/', async (req, res) => {
  try {
    const { salutation } = req.body;
    const user = await repository.create({salutation});
    res.json(user);
  } catch (e) {
    console.log(e)
  }
 
});

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await repository.deleteById(id);
    res.status(200).json([]);
  } catch (e) {

  }
  
});

app.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userData = { salutation: req.body.salutation };
    await repository.updateById(id, userData);
    res.status(200).json([])
  } catch (e) {

  }
  
});

module.exports = app;
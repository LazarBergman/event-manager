const express = require('express');
const app = express.Router();
const repository = require('../repositories/eventRepository');


app.get('/', async (req, res) => {
  try {
    const events = await repository.findMain()
    res.json(events[0]);
  } catch (e) {}
});

app.use(function (req, res, next) {
  if (req.user && req.user.state === USERSTATE.ADMIN) {
    next();
  } else {
    res.send('Access denied');
  }
});

app.post('/', async (req, res) => {
  try {
    const { title, description, startDate } = req.body;
    const event = await repository.create({title, description, startDate});
    res.json(event);
  } catch (e) {
    console.log(e)
  }
 
});

app.post('/subevent', async (req, res) => {
    try {
      const { title, startDate, id } = req.body;
      const event = await repository.addSubevent(id, {title, startDate});
      res.json(event);
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
    const userData = { title: req.body.title, description: req.body.description, startDate: req.body.startDate };
    await repository.updateById(id, userData);
    res.status(200).json([])
  } catch (e) {

  }
  
});

module.exports = app;
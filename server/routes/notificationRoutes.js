const express = require('express');
const app = express.Router();
const repository = require('../repositories/subscriberRepository');
const Sender = require('../classes/sender');



app.post('/new-mail', async (req, res) => {
  try {
    const { email, days } = req.body;
    const subscriber = await repository.create({email});
    await repository.setNotification(subscriber, days);
    res.json(subscriber);
  } catch (e) {
    console.log(e)
  }
 
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
    const { message } = req.body;
    const subscribers = await repository.getSubscribers();
    await Sender.sendMessage(subscribers, message);
    res.send(200);
  } catch (e) {
    console.log(e)
  }
 
});



module.exports = app;
const express = require('express');
const Event = require('../models/event');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.render('events', { events });
  } catch (err) {
    res.send('Error fetching events');
  }
});


router.get('/event/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.render('register', { event });
  } catch (err) {
    res.send('Error fetching event details');
  }
});


router.post('/register/:id', async (req, res) => {
  try {
    const { ticketType, numberOfAttendees } = req.body;
    const event = await Event.findById(req.params.id);

    const ticket = event.ticketTypes.find(t => t.type === ticketType);

    if (!ticket) {
      return res.send('Invalid ticket type');
    }

    if (ticket.available < numberOfAttendees) {
      return res.send('Not enough tickets available');
    }

    
    ticket.available -= numberOfAttendees;
    event.currentAttendees += numberOfAttendees;

    await event.save();
    res.send('Registration successful!');
  } catch (err) {
    res.send('Error processing registration');
  }
});

module.exports = router;
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  type: String,
  price: Number,
  available: { type: Number, default: 0 },
});

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  ticketTypes: [ticketSchema], 
  totalCapacity: { type: Number, default: 0 }, 
  currentAttendees: { type: Number, default: 0 }, 
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

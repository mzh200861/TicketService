const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketModel = new Schema({
  creation_date: {
    type: Date,
  },
  customer_name: {
    type: String,
    required: true
  },
  performance_title: {
    type: String,
    required: true
  },
  performance_time: {
    type: String,
    required: true
  },
  ticket_price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Ticket', ticketModel);


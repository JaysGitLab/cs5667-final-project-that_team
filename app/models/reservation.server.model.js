const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  firstname: {
    type: String,
    required: 'First name required!',
    trim: true
  },
  lastname: {
    type: String,
    required: 'Last name required!',
    trim: true
  },
  email: {
    type: String,
    required: 'Email is required!',
    trim: true
  },
  reservationDate: {
    type: Date,
    required: 'A date for the reservation is required!',
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: 'A reservation must have a state: open, invoiced, or paid!',
    trim: true,
    default: 'open'
  }
});

mongoose.model('Reservation', ReservationSchema);

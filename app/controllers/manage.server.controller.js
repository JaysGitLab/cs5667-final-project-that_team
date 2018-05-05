const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservation');
const nodemailer = require('nodemailer');
const config = require('../../config/config.js');
/*This file handles all socket.io configuration for the reservation service.
* This includes creating the listeners and sending the appropriate emit
* messages.
*/
module.exports = function(io, socket) {
  //TODO: Add all socket.on configurations here.
  //These are all of the listeners for messages from clients.

  //This function returns a reservation's data if successful.
  socket.on('getReservationData', (message) => {
    Reservation.findOne({"secret":message.reservationid}).select({
      _id: 0,
      firstname: 1,
      lastname: 1,
      email: 1,
      reservationDate: 1,
      created: 1,
      status: 1
    }).exec((err, reservation) => {
      if (err) {
        socket.emit('accessFailed', {message: 'Could not access reservation data.'});
      }
      else {
        socket.emit('reservationData', reservation);
      }
    });
  });

  //This function changes a reservation date and returns the new data if successful.
  socket.on('dateChange', (message) => {
    Reservation.findOne({"secret":message.secret}).exec((err, reservation) => {
      if (err) {
        socket.emit('accessFailed', {message: 'Could not access reservation data.'});
      }
      else {
        reservation.reservationDate = message.date
        reservation.save((err) => {
          if (err) {
            socket.emit('accessFailed', {message: 'Could not complete reservation update.'});
          }
          else {
            socket.emit('reservationData', reservation);
          }
        });
      }
    })
  });

  //This function removes a reservation and returns a message if successful.
  socket.on('cancelReservation', (message) => {
    Reservation.findOne({"secret":message.secret}).exec((err, reservation) => {
      if (err) {
        socket.emit('accessFailed', {message: 'Error while retrieving reservation for deletion.'});
      }
      else {
        reservation.remove((err) => {
          if (err) {
            socket.emit('accessFailed', {message: 'Error while deleting reservation.'});
          }
          else {
            socket.emit('reservationDeleted', reservation);

            //Send an email about the cancellation.
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: config.emailAddr,
                //If you use your gmail, you will need to generate an app password
                pass: config.emailPass
              }
            });
            var date = new Date(reservation.reservationDate);
            var mailOptions = {
              from: '<from-email>',
              to: reservation.email,
              subject: `Registration cancelled for ${date.toDateString()}`,
              text: `Registration cancelled for ${date.toDateString()}.`
            };
            transporter.sendMail(mailOptions, function(err, info) {
              if (err) {
                console.log(`Error in sending email with error ${err}.`);
              }
              else {
                console.log(`Email sent: ${info.response}.`);
              }
            });
          }
        });
      }
    });
  });
}

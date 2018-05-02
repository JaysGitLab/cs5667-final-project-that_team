const mongoose = require('mongoose');
const hash = require('object-hash');
const nodemailer = require('nodemailer');
const Reservation = mongoose.model('Reservation');
/*This file handles all socket.io configuration for the reservation service.
* This includes creating the listeners and sending the appropriate emit
* messages.
*/
module.exports = function(io, socket) {
  //TODO: Add all socket.on configurations here.
  //These are all of the listeners for messages from clients.

  //This hook handles new registrations.
  socket.on('reservationCreated', (message) => {

    //Parse the form
    var form = JSON.parse(message.form);

    var hashedForm = hash(form);

    //Make the new registration object
    var newReservation = new Reservation({
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      reservationDate: new Date(form.date),
      secret: hashedForm
    });

    //Attempt to insert the new registration into the database
    newReservation.save((err) => {
      //If there's an error, print the error and return reservationFailure
      if (err) {
        console.log(`Insertion Error ${err}`);
        socket.emit('reservationFailure', {message: `Reservation failed with error ${err}`});
      }
      //If there isn't an error, return reservationSuccessful
      else {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: '<from-email>',
            //If you use your gmail, you will need to generate an app password
            pass: '<from-password'
          }
        });
        var mailOptions = {
          from: '<from-email>',
          to: form.email,
          subject: `Successful registration for ${form.date}`,
          text: `Successful registration for ${form.date}.`
        };
        transporter.sendMail(mailOptions, function(err, info) {
          if (err) {
            console.log(`Error in sending email with error ${err}.`);
          }
          else {
            console.log(`Email sent: ${info.response}.`);
          }
        });
        console.log(`Reservation Successful`);
        socket.emit('reservationSuccessful', {message: 'Reservation Successful'});
      }
    });
  });

  socket.on('dateList', (message) => {
    Reservation.find({}, {reservationDate: 1}).exec((err, reservations) => {
      if (err) {
        console.log(`Error retrieving reservation list with message ${err}`);
        socket.emit('dateListFailure', {message: `Reservation listing failed with error ${err}`});
      }
      else {
        var reservationDates = [];
        for (reservation of reservations) {
          reservationDates.push(reservation.reservationDate);
        }
        socket.emit('dateListResponse', {dateList: reservationDates});
      }
    })
  });
}

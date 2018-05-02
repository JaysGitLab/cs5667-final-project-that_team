const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservation');
const User = mongoose.model('User');
const email_srv_ctrl_module = require('./email.server.controller.js').
/*This file handles all socket.io configuration for the reservation service.
* This includes creating the listeners and sending the appropriate emit
* messages.
*/
module.exports = function(io, socket) {
  //TODO: Add all socket.on configurations here.
  //These are all of the listeners for messages from clients.
  socket.on('reservationCreated', (message) => {
    var form = JSON.parse(message.form);
    console.log(form);
    var newReservation = new Reservation(form);
    newReservation.save((err) => {
      //TODO: The function which fires an email with the magic link is called regardless of reserv. success, fix this!
      // Does this user exist in mongodb already?
      if  !User.userExists(newReservation.email) {
        // User doesn't exist, so create them:
        var newUser = new User({email: newReservation.email})

      }
      if (err) {
        console.log(`Insertion Error ${err}`);
        socket.emit('reservationFailure', {message: `Reservation failed with error ${err}`});
      }
      else {
        console.log(`Reservation Successful`);
        socket.on('reservationSuccessful', {message: 'Reservation Successful'});
      }
    });
    //TODO: extract the data from the form and insert into db.
    //May be able to directly insert into db and catch an error.  OR we can do error checking.
  });
}

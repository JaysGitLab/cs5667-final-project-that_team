const mongoose = require('mongoose');
const Reservation = mongoose.model('Reservation');
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

// Load the module dependencies
const config = require('./config');
const cookieParser = require('cookie-parser');
const configureReservation = require('../app/controllers/reservation.server.controller.js');
const configureAdmin = require('../app/controllers/admin.server.controller.js');
const configureSession = require('./session.js');
/* TODO: Add SocketIO component controllers here */

// Define the Socket.io configuration method
module.exports = function(server, io) {
  io.use(function(socket, next){
    // Wrap express middleware
    configureSession(socket.request, {}, next);
  });
	// Add an event listener to the 'connection' event
  io.on('connection', (socket) => {
      var userId = socket.request.session.passport.user;
      console.log('Your user ID is: ', userId);
      configureReservation(io, socket);
      configureAdmin(io, socket);
      //TODO: add other socket configurations here.
  });
};

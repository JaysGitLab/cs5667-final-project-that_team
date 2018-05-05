// Load the module dependencies
const config = require('./config');
const cookieParser = require('cookie-parser');
const configureReservation = require('../app/controllers/reservation.server.controller.js');
const configureManage = require('../app/controllers/manage.server.controller.js');
/* TODO: Add SocketIO component controllers here */

// Define the Socket.io configuration method
module.exports = function(server, io) {
	// Add an event listener to the 'connection' event
  io.on('connection', (socket) => {
      configureReservation(io, socket);
      configureManage(io, socket);
      //TODO: add other socket configurations here.
  });
};

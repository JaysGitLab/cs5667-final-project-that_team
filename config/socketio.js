// Load the module dependencies
const config = require('./config');
const cookieParser = require('cookie-parser');
const configureRegistration = require('../app/controllers/registration.server.controller.js');
/* TODO: Add SocketIO component controllers here */

// Define the Socket.io configuration method
module.exports = function(server, io, mongoStore) {
	// Add an event listener to the 'connection' event
  io.on('connection', (socket) => {
      configureRegistration(io, socket);
      //TODO: add other socket configurations here.
  });
};

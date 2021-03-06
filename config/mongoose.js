const config = require('./config'); //The config file will prove our db path
const mongoose = require('mongoose');

/*This file will handle the mongoose database connection.
* @export: Gurney Buchanan <gurnben>
*
* @export: db object.  This is the mongoose database connection.
*/
module.exports = function() {
  const db = mongoose.connect(config.db); //uses the db path from the config
  //Require the reservation model
  require('../app/models/reservation.server.model.js');
  //Require the admin model
  require('../app/models/admin.server.model.js');
  //Any necessary models should be called here.
  return db;
}

/* What is our environment? Default to development. */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Configure the Database
const db = require('./config/mongoose')();

// Configure the Express Application
const app = require('./config/express')(db);

// Configure Passport for the Admin login:
const configurePassport = require('./config/passport')();


app.listen(3000);
module.exports = app; //Export the running application.
console.log('Park-reserve running at http://localhost:3000/'); //TODO: edit to reflect the address of the server host.

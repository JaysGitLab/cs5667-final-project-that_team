const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');

// Set up express-session middleware:
module.exports = function() {
    const name = "COOKIE_NAME";
    const secret = "COOKIE_SECRET";
    const store = new (require('connect-mongo'))(session)({
        url: "mongodb://localhost/parkreg-dev"
    });
};

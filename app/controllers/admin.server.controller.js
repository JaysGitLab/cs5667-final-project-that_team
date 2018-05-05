const mongoose = require('mongoose');
const config = require('../../config/config.js');
const passport = require('passport');
const Admin = mongoose.model('Admin');

/*
* This file handles all socket.io configuration for the Admin service.
* This includes creating the listeners and sending the appropriate emit
* messages.
*/
module.exports = function(io, socket) {
    // These are all of the listeners for messages from clients.

    // This hook handles admin login requests:
    socket.on('adminLoginRequest', (message) => {
        var usernameExists = false;
        // Parse the received form:
        var form = JSON.parse(message.form)
        console.log('Server received admin login request:', form)
        // console.log('username: ', form.username);
        // Check the database to see if the username is present:
        Admin.findOne({'username': form.username}).select({
            firstName: 1,
            lastName: 1,
            email: 1,
            password: 1,
            salt: 1,
            provider: 1,
            providerId: 1,
            providerData: 1,
            created: 1
        }).exec((err, admin) => {
            if (err) {
                socket.emit('accessFailed', {message: 'Could not access admin user data.'});
            } else {
                if (admin != null) {
                    usernameExists = true;
                    socket.emit('adminUserData', admin);
                } else {
                    socket.emit('userNotFound', {message: 'The provided username: ' + form.username + ' is not in the database.'})
                }
            }
        });
    });
    // TODO: Check the database to see if the username password combo exists:
}

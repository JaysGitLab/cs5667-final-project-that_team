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
        Admin.findOne({"username": form.username}).select({
            username: 1
        }).exec((err, admin) => {
            if (err) {
                socket.emit('accessFailed', {message: 'Could not access admin user data.'});
            } else {
                if (admin != null) {
                    usernameExists = true;
                    // console.log('Server acknowledges username: ' + form.username + ' exists.');
//                    passport.authenticate('local', form.password), function(req, res) {
//                        console.log('authenticated: ' + form.username + 'with password: ' + form.password);
//                        socket.emit('adminUserData', admin);
//                    }
//                    // Password login logic:
//                    if (passport.authenticate('local', form.password) == true) {
//                        console.log('authenticated: ' + form.username + 'with password: ' + form.password);
//                        socket.emit('adminUserData', admin);
//                    } else {
//                        socket.emit('badPassword', {message: 'The password provided was incorrect'});
//                    }

                } else {
                    socket.emit('userNotFound', {message: 'The provided username: '
                        + form.username + ' is not in the database.'})
                }
            }
        });
        // TODO: Encrypt the username and password!!!!
        Admin.findOne({'username': form.username, 'password': form.password}).select({
            username: 1,
            password: 1
        }).exec((err, admin) => {
            if (err) {
                socket.emit('accessFailed', {message: 'Could not access admin user data.'});
            } else {
                if (admin != null) {
                    console.log('authenticated: ' + form.username + 'with password: ' + form.password);
                    // socket.emit('adminUserData', admin);
                    socket.emit('authSuccess', {message: 'The provided username and password match the database, auth succeeded.'});
                } else {
                    socket.emit('badUsernamePassword', {message: 'Either password or username is incorrect.'});
                }
            }
        });
    });
    // TODO: Check the database to see if the username password combo exists:
}

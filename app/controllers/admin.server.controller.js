const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const config = require('../../config/config.js');
const passport = require('passport');
const Admin = mongoose.model('Admin');
const Reservation = mongoose.model('Reservation');
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
                    socket.emit('authSuccess', {message: 'The provided username and password match the database, auth succeeded.'});
                } else {
                    socket.emit('badUsernamePassword', {message: 'Either password or username is incorrect.'});
                }
            }
        });
    });

    //This hander will respond with a list of all reservations.
    socket.on('getReservationList', (message) => {
      Reservation.find({}).select({
        "_id": 0,
        "firstname": 1,
        "lastname": 1,
        "email": 1,
        "reservationDate": 1,
        "secret": 1,
        "created": 1,
        "status": 1
      }).exec((err, reservations) => {
        if (err) {
          socket.emit('accessFailed', {message: "Unable to retrieve reservation list."});
        }
        else {
          socket.emit('reservationList', JSON.stringify(reservations));
        }
      });
    });

    //This handler will change the reservation's status.
    socket.on('updateStatus', (message) => {
      Reservation.findOneAndUpdate({"secret":message.secret}, {"status":message.status}, {new: 1}, (err, r) => {
        if (err) {
          socket.emit('accessFailed', {message: 'Could not access reservation data.'});
        }
        else {
          socket.emit('statusUpdated', {reservation: r.secret, status: r.status});
        }
      });
    });

    //This handler will handle the creation and sending of an invoice.
    socket.on('invoiceUser', (message) => {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.emailAddr,
          //If you use your gmail, you will need to generate an app password
          pass: config.emailPass
        }
      });
      var mailOptions = {
        from: '<from-email>',
        to: message.reservation.email,
        subject: `Invoice for Green Valley Park Reservation`,
        text: `You owe us $${message.amount}, but we don't have invoices yet!`
      };
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(`Error in sending email with error ${err}.`);
        }
        else {
          console.log(`Email sent: ${info.response}.`);
        }
      });
    })
}

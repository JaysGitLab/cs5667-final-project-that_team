const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
/*
* This file handles the sending of a magic authentication link via email which the user can click on to authenticate.
*/

const generate_user_secret_key = (email_address) {
    if User.statics.userExists(email_address) {
        console.log('Tried to generate a secret key for a user already in the database, key not regenerated.')
    } else {
        console.log('Requested a secret key for a user not already in the database, generating new secrete key.')
        /*
        *  I believe this method will create the secret key based off the user's email address and then store it in
        *   the database using the UserSchema's jwt-secret-key field.
        */
        jwt.sign({ id: email_address.id }, User.jwt-secret-key);
    }
    send_magic_link_email(email_address)

}
module.exports = { generate_user_secret_key };

const send_magic_link_email = (email_address) {
    MailService.create({
        to: email_address,
        subject: 'Magic Link for Park Reservation Authentication',
        html: `
            <h1>Magic link</h1>
            <a href="${config.host}/api/accounts/me?token=${encodeURIComponent(token)}">
            YOUHOU
            </a>
        `,
        text: `Magic link: ${config.host}/api/accounts/me?token=${encodeURIComponent(token)}`,
    });
}

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   email: {
    type: String,
    required: 'Email is required!',
    trim: true
  },
  jwtSecretKey: {
    //TODO: This should not be stored in plaintext, use salt to encrypt the SHA256 secret key.
    type: Number,
    required: 'User\'s secret key is required for authentication!',
  }
});

/*
* assign static function to the "statics" object of the UserSchema (see: http://mongoosejs.com/docs/guide.html#statics)
* This function returns true if the provided email_address is already in the database.
*/
UserSchema.statics.userExists = function(email_address) {
    return this.find({email: new RegExp(email_address, 'i')});
}

/*
* This function is callable by UserSchema mongoose.model objects (see: http://mongoosejs.com/docs/guide.html#methods)
* returns true if the subclass has a jwtSecretKey in the database already.
*/
UserSchema.methods.has_secret_key = function(err) {
    if (err) {
        console.log(err + 'occurred.');
    } else {
        return this.model('User').jwtSecretKey;
    }
}

/*
* This function is callable by User mongoose.model type subclasses to generate a new jwtSecretKey for this user in
* the database.
*/
UserSchema.methods.generate_new_secret_key = function(err) {
    if (err) {
        console.log(err + 'occurred.');
    } else {
        this.model('User').jwtSecretKey = jwt.sign({ id: email_address.id }, this.model('User').jwt-secret-key);
    }
}



mongoose.model('User', UserSchema);

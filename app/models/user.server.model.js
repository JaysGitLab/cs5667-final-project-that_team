const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   email: {
    type: String,
    required: 'Email is required!',
    trim: true
  },
  jwt-secret-key: {
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
    return this.find({email: new RegExp(email_address, 'i')})
}

mongoose.model('User', UserSchema);

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

mongoose.model('User', UserSchema);

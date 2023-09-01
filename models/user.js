const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
}, {
        timestamps: true //This field will create createdAt and updatedAt in db. Mongoose does it for us
});

const User = mongoose.model('User', userSchema);

module.exports = User;
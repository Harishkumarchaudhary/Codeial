const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const AVATAR_PATH = path.join('/uploads/users/avatars')

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
      },
      avatar: {
        type: String
      }
}, {
        timestamps: true //This field will create createdAt and updatedAt in db. Mongoose does it for us
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('***path join is:', path.join(__dirname, '..', AVATAR_PATH));
    cb(null, path.join(__dirname, '..', AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    console.log('***model user fileName', file);
    cb(null, file.fieldname + '-' + Date.now());
  }
});

//static methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;
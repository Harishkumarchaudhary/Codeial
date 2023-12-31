const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind('Error in connecting to the DB'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDb');
});

module.exports = db;
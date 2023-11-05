const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://44.200.166.155/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind('Error in connecting to the DB'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDb');
});

module.exports = db;
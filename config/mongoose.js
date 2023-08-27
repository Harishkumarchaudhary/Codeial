const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');

const db = mongoose.connection;

db.on('error', console.error.bind('Error in connecting to the DB'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDb');
});

module.exports = db;
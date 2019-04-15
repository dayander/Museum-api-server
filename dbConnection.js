const mongoose = require('mongoose');


const dbURI = "mongodb+srv://dayander:Burton12@msu-museum-server-q1cdr.mongodb.net/museum?retryWrites=true";

mongoose.connect(dbURI);


const db = mongoose.connection;

db.on('error', console.error.bind(console, '# MongoDB connection error:'));


module.exports  = db;



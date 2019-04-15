const mongoose = require('mongoose');

const Image = require('./image').schema;





    let exhibitSchema = mongoose.Schema({
    name: String,
    title: String,
    description: String,
    img: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
    published: Boolean




});

let Exhibit = mongoose.model('Exhibit', exhibitSchema);



module.exports = Exhibit;



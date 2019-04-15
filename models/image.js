const mongoose = require('mongoose');






let imageSchema = mongoose.Schema({
    img: {data: Buffer, contentType: String},
    altText: String
});





let Image = mongoose.model('Image', imageSchema);


module.exports = Image;
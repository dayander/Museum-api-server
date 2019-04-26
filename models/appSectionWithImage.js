const mongoose = require('mongoose');

const Image = require('./image').schema;



let appSectionWithImageSchema = mongoose.Schema({
    exhibitID: ObjectID,
    sectionHeading: String,
    sectionImage: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
    sectionDescription: String,
    order: Number
});



let AppSectionWithImage = mongoose.model("AppSectionWithImage", appSectionWithImageSchema);


modelue.exports = AppSectionWithImage;
const mongoose = require('mongoose');





let imageSchema = mongoose.Schema({
    img: {data: Buffer, contentType: String},
    altText: String,
    pathToImg: String,
    fileName: String,
});


let appSectionWithImageSchema = mongoose.Schema({
    exhibitID: String,
    sectionHeading: String,
    sectionImageAltText: String,
    sectionImagePath:String,
    sectionDescription: String,
    order: Number,
    newImage: Boolean
});



    let exhibitSchema = mongoose.Schema({
    name: String,
    subHead: String,
    mainImg: {altText:String, path: String, filename:String, newImage: Boolean},
    description: String,
    appSections:[appSectionWithImageSchema],
    published: Boolean




});

let Exhibit = mongoose.model('Exhibit', exhibitSchema);



module.exports = Exhibit;



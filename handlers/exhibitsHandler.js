//import mongoose models
let Exhibit = require('../models/exhibits');




exports.getExhibits = function (req, res, next) {






};





exports.newExhibit = function (req, res, next) {

    console.log(req.body);
    console.log(req.files);


    const exhibit = new  Exhibit({
        name: name,
        title: title,
        description: description,
        img:{img:file}

    })

    Exhibit.create({})




}
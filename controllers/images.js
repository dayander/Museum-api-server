const Image = require('../models/image');



exports.index = function (req, res) {
    //looking for an image in the db

}


exports.show = function (req, res) {

}


exports.create = function (req, res) {

    const path = require('path');
    const remove = path.join(__dirname, '../public');
    const relPath = req.file.path;

};


exports.update = function (req, res) {

}


exports.destroy = function (req, res) {

}
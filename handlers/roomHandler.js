const Room = require('../models/rooms');
let Exhibit = require('../models/exhibits');
var request = require('request');





exports.getDevices = function (req, res, next) {

    const options = {
        url: 'https://cloud.estimote.com/v3/attachments',
        headers: {
            'Authorization': 'Basic bXN1LW11c2V1bS13ZWItZnJvbnRlbmQtNXB3OjM3NWIzMTE1NzM1YTdkZjk3ZGMzZGQ1YzNhZWZkYTk5'
        }
    }


    request(options, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        if(error){
            throw error
        }

        res.json(JSON.parse(body))

    });


};





exports.newRoom = function (req, res, next) {


    const body = req.body;

    console.log(body);
    const device = JSON.parse(body.deviceSelector)

    let newRoom = new Room({
        name: body.newRoomName,
        device:{
            id: device.id,
            identifier: device.identifier,
            payload:{
                roomName: device.payload.roomName
            }

        },
        exhibits:[
            ...body.exhibitSelector
        ]

    })

    console.log('before save', newRoom)


    newRoom.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            console.log('should work', newRoom)
            res.send('room saved')
        }

    })

    
}


exports.getRooms = function (req, res, next) {





    // Room.find({}, function (err, room) {
    //
    //     if(err){
    //         throw err
    //     } else{
    //         console.log('before', room)
    //         room.populate('exhibits').execPopulate();
    //
    //
    //         console.log('after', room);
    //
    //
    //         res.json(room)
    //     }
    //
    // })


    Room.find({}).populate('exhibits').exec(function (err, room) {
        if(err){
            throw err
        }


        res.json(room)

    })

};



exports.getSingleRoom = function (req, res, next) {

    const idToFind = req.params.id;
    Room.findOne({_id: idToFind}).populate('exhibits').exec( function (err, room) {
        if(err){
            console.log(err)
            return
        }

        res.json(room)

    })

}




exports.updateRoom = function (req, res, next) {

  const body = req.body;
  const idToFind = body._id;

    console.log(body);


    Room.findOneAndUpdate({_id: idToFind}, body, {new:true}, function (err, newRoom) {

        if(err){
            console.log(err);
            return
        }

        res.json(newRoom)

    })


};
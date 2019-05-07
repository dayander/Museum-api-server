const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Exhibit = require('./exhibits');
const exhibitSchema = Exhibit.Schema;


const roomSchema = Schema({
    name:String,
    device:{
        id:Number,
        identifier: String,
        payload:{
            roomName: String,
        }
    },
    
    exhibits: [{type:Schema.Types.ObjectId, ref:'Exhibit'}]
});

const Room = mongoose.model('Room', roomSchema);


module.exports = Room;




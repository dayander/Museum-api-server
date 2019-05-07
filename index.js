const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const path = require('path');
const app = express();
const router = require('./routes');
const cors = require('cors');
const config = require('./config');
const cookieParser = require('cookie-parser');
require('./models/exhibits');

//Reading Images and putting on requests



app.use(morgan('combined'));
app.use(bodyParser.json());

//image uploads
app.use(express.static(path.join(__dirname, './public')));


const publicOptions = {
    origin: function (origin, callback) {
        callback(null, true)
    },
    methods: "GET"
};






const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));


app.use(cookieParser(config.secret));



router(app);

const port = process.env.PORT || 3090;

app.listen(port, function (err) {
    if(err){
        console.log('error ', err )
    }

    console.log("server on ", port);
});



const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

const userHandler = require('./handlers/userHandler');
const exhibitHandler = require('./handlers/exhibitsHandler');

const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const uploadDir = path.join(__dirname, './public/uploads', `${Date.now()}`)
        fs.mkdirSync(uploadDir)
        callback(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)

    }
})



const upload = multer({storage});

module.exports = function (app) {

app.get('/', function (req, res, next) {

    res.send("working");

})

app.get('/check', function (req, res) {

    console.log(req.cookies)

} )


app.post('/newuser', userHandler.signup);

    app.post('/login', requireSignin, userHandler.login );


app.get('/exhibits/:id', exhibitHandler.getSingleExhibit);
app.post('/exhibits/:id', upload.any('image'), exhibitHandler.updateExhibit);
app.delete('/exhibits/:id', exhibitHandler.deleteExhibit);


app.get('/exhibits',  exhibitHandler.getExhibits );

app.post('/newexhibit', upload.any('image'),  exhibitHandler.newExhibit)




};
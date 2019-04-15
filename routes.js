const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

const userHandler = require('./handlers/userHandler');
const exhibitHandler = require('./handlers/exhibitsHandler')

module.exports = function (app) {

app.get('/', function (req, res, next) {

    res.send("working");

})

app.get('/check', function (req, res) {

    console.log(req.cookies)

} )


app.post('/newuser', userHandler.signup);

    app.post('/login', requireSignin, userHandler.login );


app.get('/exhibits', requireAuth, )

app.post('/newexhibit',  exhibitHandler.newExhibit)




};
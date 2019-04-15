const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const Users = require('../models/users');
const config = require('../config');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


//create local strategy
const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {

    Users.findOne({email: email}, function (err, user) {
        if(err){return done(err)}
        if(!user){return done(null, false)}

        //compare password
        user.comparePassword(password, function (err, isMatch) {
            if(err){ return done(err)}

            if(!isMatch){ return done(null, false)}

            if(isMatch){
                return done(null, user)
            }

        })


    })

});

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
    }
    return token;
};



const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};



//create JWT //payload is decoded token
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user id in payload exists in our database
    //If it does, call 'done' with that
    // otherwise call done without a user obj


    Users.findById(payload.sub, function (err, user) {
        if(err){return done(err, false)}

        if(user){
            done(null, user)
        }else {
            done(null, false)
        }

    })
});



//tell passport to use this shit
passport.use(jwtLogin);
passport.use(localLogin);

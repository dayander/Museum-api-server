const Users = require('../models/users');
const db = require('../dbConnection');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user) {

    const timeStamp = new Date().getTime();

    return jwt.encode({sub: user._id, iat: timeStamp}, config.secret)
}


exports.login = function(req, res, done){
    const fullName = req.user.firstName +" "+ req.user.lastName;

    res.cookie('token', tokenForUser(req.user), {httpOnly: true})


    res.send({token: tokenForUser(req.user), userID:req.user._id, userName: fullName });
};






exports.signup = function(req, res, next) {

    var {firstName, lastName, email, password} = req.body;

    console.log(firstName);







    //check to see if user exists

    Users.findOne({email: email}, function (err, existingUser) {


        if(existingUser){
            console.log("user in user");
            return res.status(422).send({error:"Email already in use"})
        }

        const user = new Users({
            email: email,
            password: password,
            lastName: lastName,
            firstName: firstName,
        });

        user.save(user, function(err, user){
            if(err){
                throw err;

            }

            console.log(user);
            const fullName = user.firstName +" "+ user.lastName;

            return res.json({token: tokenForUser(user), userID:user._id, userName: fullName });
        })




    });




    //return res.send(user)


};





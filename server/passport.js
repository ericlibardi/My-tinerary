const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("./model/userModel");
const key = require("./keys");
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const jwt = require("jsonwebtoken");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= key.secretOrKey;


module.exports = passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

module.exports = passport.use(
  new GoogleStrategy({
  clientID: key.googleClientId,
  clientSecret: key.googleClientSecret,
  callbackURL: "http://localhost:5000/users/googleresponse"
}, (accessToken, refreshToken, email, done) => {
    User.findOne({email: email._json.email}).then((currentUser) => {
      if(currentUser){
        
        User.updateOne({_id: currentUser._id}, { $set: {
          logedin: true 
        }}).then(res=> {
          return res

        })

        console.log("current user")  
        currentUser.save().then(res => {
          
          return done(null, res)
        })
      }else {
        const newUser = new User({
          username: email._json.name,
          email: email._json.email,
          oAuth: true,
          password: "",
          image: email._json.picture,
          logedin: true,
          itineraries: ""
          })
          newUser.save()
            .then(user => { 
            console.log("new user created")
              return done(null, user)
            })
            .catch(err => {
              console.log(err)
      })
      } 
    })   
}

));
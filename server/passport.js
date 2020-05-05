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

/* passport.serializeUser((user, done) =>{

  const payload = {
    id: user.id,
    username: user.email,
    image: user.image
  };
  const options = { expiresIn: 2592000 };
            jwt.sign(payload,
              key.secretOrKey,
             options, (err, token) => {
                if (err) {
                    res.json({
                        success: false,
                        token: "There was an error"
                    });
                }
                else {
                    console.log(token);
                    res.json({
                        success: true,
                        token: token
                    })
                }
            });
})
 */

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
        
        console.log("current user")  
        currentUser.save().then(res => {
          
          return done(null, res)
        })
      }else {
        const newUser = new User({
          email: email._json.email,
          oAuth: true,
          password: "",
          image: email._json.picture,
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
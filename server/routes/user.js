const express = require('express')
const userModel = require('../model/userModel')
const router = express.Router()
const bcrypt = require("bcrypt")
const { check, validationResult } = require('express-validator');
const passport = require('passport')

const cors = require("cors");

const key = require("../keys");
const jwt = require("jsonwebtoken");

router.get('/all',
    (req, res) => {
        userModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

router.post('/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 6}),
    check('username').isLength({max: 28})
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()});
        }

    bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        image: req.body.image,
        logedin: true,
        itineraries: ""
    })
    newUser.save()
      .then(user => {
      //res.send(user)

      const payload = {
        username: user.username,
        id: user.id,
        email: user.email,
        image: user.image
      }
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
                    });
                }
            });

      })
      .catch(err => {
      res.status(500).send("Server error" + err)}) 
})
});

router.post('/login', cors(), async(req,res) =>{
    console.log("login route")
    try {
      let user = await userModel.findOne({ email: req.body.email })
        if (!user) {
          res.json({sucess: false, message: 'user do not exist'})
        } else {
          const match = await bcrypt.compare(req.body.password, user.password)
          if (!match) { 
            res.send({sucess: false, message: 'password do not match'})
           } 
           console.log(user.id)
           userModel.updateOne({_id: user.id}, { $set: {
            logedin: true 
          }}).then(res=> {
            return res
  
          })
           const payload = {
            username: user.username,
            id: user.id,
            email: user.email,
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
                    });
                }
            });

        }
    }
    catch (err) {
      console.error(err.message);
        res.status(500).send('Server error')
    }
})

router.get( "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user.id })
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ error: "User does not exist!" }));
  }
);

router.get("/googlelogin", 
  passport.authenticate('google', { scope: ['profile','email'] }))

router.get("/googleresponse", 
  passport.authenticate('google', { session: false }),
  async(req, res) => {
    try {
        console.log(req.user)

           const payload = {
            username: req.user.username,
            id: req.user.id,
            email: req.user.email,
            image: req.user.image
        };

        const options = { expiresIn: 2592000 };
            jwt.sign(payload,
              key.secretOrKey,
             options, (err, token) => {
              res.redirect(`http://localhost:3000/?code=${token}`);
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
                    });
                }
            });

        }
    catch (err) {
      console.error(err.message);
        res.status(500).send('Server error')
    }

  })

router.post('/logout', async(req,res) => {
  const userEmail = req.body.userEmail
  console.log(userEmail)
  userModel.updateOne({email: userEmail}, { $set: {
  logedin: false 
}}).then(res=> {
  return res
})
})

router.post('/itineraries', 
passport.authenticate("jwt", { session: false }),
async(req,res) => {
  
let user = await userModel.findOne({ email: req.user.email })

const checkItinerary = user.itineraries.indexOf(req.body.itinerary)
console.log(checkItinerary)

if (checkItinerary >= 0) {
  const beforeItinerary = user.itineraries.slice(0 , checkItinerary)
  const afterItinerary = user.itineraries.slice(checkItinerary + 1, user.itineraries.length)
  const newItineraries = beforeItinerary.concat(afterItinerary)
  userModel.updateOne({email: user.email}, {$set:{
    itineraries: newItineraries
  }}).then(response=> {
    res.send(response)
  })
} else {
  userModel.updateOne({email: user.email}, {$push:{
    itineraries: req.body.itinerary
  }}).then(response=> {
    res.send(response)
  })
}
})

module.exports = router
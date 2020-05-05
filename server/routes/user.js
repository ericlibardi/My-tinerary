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
    check('password').isLength({ min: 6})
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()});
        }

    bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new userModel({
        email: req.body.email,
        password: hash,
        image: req.body.image
    })
    newUser.save()
      .then(user => {
      //res.send(user)

      const payload = {
        id: user.id,
        username: user.email,
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
            id: req.user.id,
            username: req.user.email,
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

module.exports = router
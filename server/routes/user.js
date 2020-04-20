const express = require('express')
const userModel = require('../model/userModel')
const router = express.Router()
const bcrypt = require("bcrypt")

router.get('/all',
    (req, res) => {
        userModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

router.get('/:user',
	(req, res) => {
  		let emailRequested = req.params.email;
  		cityModel.findOne({ email: emailRequested })
			.then(user => {
				res.send(user)
			})
			.catch(err => console.log(err));
});

router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new userModel({
        email: req.body.email,
        password: hash,
        image: req.body.urlPicture
    })
    newUser.save()
      .then(user => {
      res.send(user)
      })
      .catch(err => {
      res.status(500).send("Server error")}) 
})
});

module.exports = router
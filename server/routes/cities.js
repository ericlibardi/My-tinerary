const express = require('express')
const cityModel = require('../model/cityModel')
const router = express.Router()

router.get('/all',
    (req, res) => {
        cityModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

router.get('/:name',
	(req, res) => {
  		let cityRequested = req.params.name;
  		cityModel.findOne({ name: cityRequested })
			.then(city => {
				res.send(city)
			})
			.catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const newCity = new cityModel({
        name: req.body.name,
        country: req.body.country,
        image: req.body.image
    })
    newCity.save()
      .then(city => {
      res.send(city)
      })
      .catch(err => {
      res.status(500).send("Server error")}) 
});

module.exports = router
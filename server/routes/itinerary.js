const express = require('express')
const itineraryModel = require('../model/itineraryModel')
const router = express.Router()

router.get('/all',
    (req, res) => {
        itineraryModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

router.get('/:cityId',
    (req, res) => {
        let itineraryRequest = req.params.cityId;
        itineraryModel.find({ cityId: itineraryRequest})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

router.post('/comments')

module.exports = router
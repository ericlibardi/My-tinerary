const express = require('express')
const commentModel = require('../model/commentModel')
const router = express.Router()

router.get('/all',
    (req, res) => {
        itineraryModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });
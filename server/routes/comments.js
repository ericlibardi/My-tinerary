const express = require('express')
const commentModel = require('../model/commentModel')
const userModel = require('../model/userModel')
const router = express.Router()
const passport = require('passport')

router.get('/get', (req, res) => {
    try{
    commentModel.find({}).then((response)=>{
        res.send(response)
    })}
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

router.post('/create', 
passport.authenticate("jwt", { session: false }),
async(req, res) => {
    try{
    const userCheck = await userModel.findOne({email: req.user.email})
    if(userCheck.logedin===true && userCheck !== undefined) {
    const newComment = new commentModel({
        comment: req.body.comment,
        userId: req.user._id,
        username: req.user.username,
        userImage: req.user.image,
        itineraryId: req.body.itinerary
    })

    console.log(newComment)
    newComment.save().then(()=>{
        commentModel.find({cityId: req.body.city}).then(response=> {
            res.send(response)
        })
    })
} else{
    res.json("no user found")
}}
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

router.post('/delete', 
passport.authenticate("jwt", { session: false }),
async(req, res) => {
    try{

    console.log(req.user._id == req.body.comment.userId)

    if(req.user._id == req.body.comment.userId) {
        await commentModel.deleteOne({_id: req.body.comment._id})
    .then(()=>{
        commentModel.find({cityId: req.body.comment.cityId}).then(response=> {
            res.send(response)
        })
    })
} else{
    res.json("no user found")
}}
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

router.post('/edit', 
passport.authenticate("jwt", { session: false }),
async(req, res) => {
    try{
    commentModel.updateOne({_id: req.body.comment._id}, {$set:{
        comment: req.body.itinerary
      }}).then(response=> {
        commentModel.find({cityId: req.body.comment.cityId}).then(response=> {
            res.send(response)
        })
      })
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

module.exports = router
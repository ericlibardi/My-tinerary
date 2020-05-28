const express = require('express')
const replyModel = require('../model/replyModel')
const userModel = require('../model/userModel')
const router = express.Router()
const passport = require('passport')

router.get('/get', (req, res) => {
    try{
    replyModel.find({}).then((response)=>{
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
    const newReply = new replyModel({
        reply: req.body.reply,
        userId: req.user._id,
        username: req.user.username,
        userImage: req.user.image,
        commentId: req.body.comment._id
    })
    console.log(newReply)
    newReply.save().then(()=>{
        replyModel.find({}).then(response=> {
            res.send(response)
        })
    })

    } else{
        res.json("no user found")
    }
}
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

router.post('/delete', 
passport.authenticate("jwt", { session: false }),
async(req, res) => {
    try{
    console.log(req.user)
    console.log(req.body.reply)
    if(req.user._id == req.body.reply.userId) {
        await replyModel.deleteOne({_id: req.body.reply._id})
    .then(()=>{
        replyModel.find({}).then(response=> {
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


module.exports = router
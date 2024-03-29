const express = require('express')
const multer = require('multer')
const path = require('path')
const Comment = require('../../model/Comment')

const router = express.Router()

router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if(err) res.status(400).json({success: false, err})
        
        Comment.find({'_id': comment._id})
            .populate('writer')
            .exec((err, result) => {
                if(err) res.status(400).json({success: false, err})
                res.status(200).json({success: true, result})
            })
    })
})

router.post('/getComments', (req, res) => {
    Comment.find({'postId': req.body.videoId})
        .populate('writer')
        .exec((err, comments) => {
            if(err) res.status(400).json({success: false, err})
            res.status(200).json({success: true, comments})
        })
})


module.exports = router
const express = require('express')
const multer = require('multer')
const path = require('path')
const Video = require('../../model/Video')
const Like = require('../../model/Like')

const router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 file is allowed'), false)
        }
        cb(null, true)
    }
})
  
var upload = multer({ storage: storage }).single('file')


router.post('/uploadfiles', (req, res) => {
    upload(req, res, err => {
        if(err) {
            return res.json({
                success: false,
                err
            })
        }
        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename
        })
    })
})

// router.post('/thumbnail', (req, res) => {
    
// })

router.post('/uploadVideo', (req, res) => {
    const video = new Video(req.body)

    video.save((err, video) => {
        if(err) return res.status(400).json({
            success: false,
            err
        }) 
        return res.status(200).json({
            success: true
        })
    })
})

router.get('/getVideos', (req, res) => {
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({
                success: true,
                videos
            })
        })
})

router.post('/getVideo', (req, res) => {
    Video.findOne({_id: req.body.videoId})
        .populate('writer')
        .exec((err, video) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({
                success: true,
                video
            })
        })
})

router.post('/getLikedVideos', (req, res) => {
    
    Like.find({'userId': req.body.userId})
        .exec((err, likes) => {
            if(err) return res.status(400).json({success: false, err})

            let likedVideos = []

            likes.map(like => {
                if(like.videoId) {
                    likedVideos.push(like.videoId)
                }
            })

            Video.find({'_id': { $in: likedVideos }})
                .populate('writer')
                .exec((err, videos) => {
                    if(err) return res.status(400).json({success: false, err})
                    res.status(200).json({
                        success: true,
                        videos
                    })
                })
        })
})


module.exports = router
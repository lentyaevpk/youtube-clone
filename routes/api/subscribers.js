const express = require('express')
const multer = require('multer')
const path = require('path')
const Subscribers = require('../../model/Subscribers')

const router = express.Router()

router.post('/getSubscribers', (req, res) => {
    let variable = {
        userTo: req.body.userTo
    }

    Subscribers.find(variable)
        .exec((err, subscribers) => {
            if(err) res.status(400).json({success: false, err})
            res.status(200).json({
                success: true,
                subscribers
            })
        })
})

router.post('/subscribe', (req, res) => {
    let variable = {
        userTo: req.body.userTo,
        userFrom: req.body.userFrom
    }

    let subscriber = new Subscribers(variable)

    subscriber.save((err, sub) => {
        if(err) res.status(400).json({success: false, err})
        res.status(200).json({
            success: true
        })
    })
})

router.post('/unsubscribe', (req, res) => {
    let variable = {
        userTo: req.body.userTo,
        userFrom: req.body.userFrom
    }

    Subscribers.findOneAndDelete(variable)
        .exec((err, sub) => {
            if(err) res.status(400).json({success: false, err})
            res.status(200).json({
                success: true
            })
        })
})


module.exports = router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secret;
const passport = require('passport');
const User = require('../../model/User');

router.post('/register', (req, res) => {
    let {
        username,
        password,
        confirm_password
    } = req.body;

    if(password !== confirm_password) {
        return res.status(400).json({
            msg: 'Password do not match'
        })
    }
    // Check for the unique username
    User.findOne({username: username}).then(user => {
        if(user) {
            return res.status(400).json({
                msg: 'Username already taken'
            })
        }
    })
    // Everything is fine
    let newUser = new User({
        username,
        password
    });
    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: 'User is now registred'
                });
            }).catch(err => {})
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: 'Username is not found',
                success: false
            })
        }

        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch){
                // user's password is correct and we need to send JWT for that user
                const payload = {
                    _id: user._id,
                    username: user.username
                }
                jwt.sign(payload, key, {expiresIn: 604800}, (err, token) => {
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: `Bearer ${token}`,
                        msg: 'You are now logged in'
                    })
                })
            } else {
                return res.status(404).json({
                    msg: 'Incorrect password',
                    success: false
                })
            }
        })
    })
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.json({
        user: req.user
    });
});

module.exports = router;
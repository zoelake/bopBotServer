const User = require('../Models/user');
const Playlist = require('../Models/playlist');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//create a new user, if email isn't already in use
const signup = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send('server error')
        if (user) {
            return res.status(409).send(`${req.body.email} is already in use`)
        } else {
            const user = new User();
            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password
            user.avatar = req.body.avatar
            user.save((err, done) => {
                if (err) return res.status(500).send('sign up failed :(')
                res.status(200).send(user)
            })
        }
    })


}

// log in existing user
const login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) return res.status(404).send(`user with email ${req.body.email} was not found`)
        if (user.comparePassword(req.body.password)) {
            const token = jwt.sign({ id: user._id }, 'thisismysecret');
            // @zoë change this to sending the token when improving this app later this spring :) 
            res.status(200).json({user})
        } else {
            return res.status(500).send('server error')
        }
    })
}

// update current user's name
const updateName = (req, res) => {
    console.log(req.body)
    User.updateOne({ name: req.body.name }, { $set: { name: req.body.newName } }, (err, user) => {
        if(err || !user) return res.status(500).send('something went wrong')
        res.status(200).send(`${req.body.name} was updated to ${req.body.newName}`)
    })
}

// update current user's email
const updateEmail = (req, res) => {
    console.log(req.body)
    User.updateOne({ email: req.body.email }, { $set: { email: req.body.newEmail } }, (err, user) => {
        if(err || !user) return res.status(500).send('server error')
        res.status(200).send(`${req.body.email} was updated to ${req.body.newEmail}`)
    })
}

// update current user's password (encrypted)
const updatePassword = (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) return res.status(500).send('no user found')
        if (user.comparePassword(req.body.password)) {
            user.password = req.body.new_password;
        }
        user.save((err, done) => {
            if (err) return res.status(500).send('failed to save password')
            res.status(200).send('password updated')
        })
    })
}


module.exports = {
    signup,
    login,
    updateName,
    updateEmail,
  
    updatePassword,
}

// const getUsers = (req, res) => {
//     // res.json(Todos);
//     User.find({}, (err, data) => {
//         res.json(data)
//     })
// }



// const getUserById = (req, res) => {
//     let user = Users.filter(item => item.id == request.params.id)
//     res.json(user)
// }

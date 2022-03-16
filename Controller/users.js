const User = require('../Models/user');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            return res.status(409).send("email already in use")
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


const login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) return res.status(404).send('user not found')
        // console.log(user)
        if (user.comparePassword(req.body.password)) {
            const token = jwt.sign({ id: user._id }, 'thisismysecret');
            res.status(200).send(user)
        } else {
            // res.send('could not login')
            return res.status(404).send('something went wrong :(')
        }
    })
}
const updateName = (req, res) => {
    console.log(req.body)
    User.updateOne({ name: req.body.name }, { $set: { name: req.body.newName } }, (err, user) => {

        res.status(200).send(req.body.newName)
    })
}

const updateEmail = (req, res) => {
    console.log(req.body)
    User.updateOne({ email: req.body.email }, { $set: { email: req.body.newEmail } }, (err, user) => {

        res.status(200).send(req.body.newEmail)
    })
}

// const getPlaylists = (req, res) => {
//     console.log('getting playlists: ')
//     console.log(req)
//     User.findOne({ email: req.body.user }, (err, user) => {
//         console.log(user)
//         if (user) {
//             res.status(200).send(user)
//         } else {
//             // res.send('could not login')
//             return res.status(404).send('something went wrong :(')
//         }
//     })

// }

const getPlaylists = (req, res) => {
    console.log('getting playlists:')
    console.log(req.body.user)
    User.findOne({ email: req.body.user }, (err, user) => {
        console.log(user)
        if (user) {
            return res.status(200).send(user)
        }
        if (err) return res.status(500).send('something went wrong')
    })


}

const createPlaylist = (req, res) => {
    console.log('creating')
    console.log(req.body.user)
    User.updateOne({ email: req.body.user },
        {
            $addToSet: {
                playlists: {
                    name: req.body.playlist_name,
                    img: req.body.playlist_img,
                },
            }
        }, (err) => {
            if (err) return res.status(500).send('sign up failed :(')
            res.status(200).send(req.body.playlist_name)
        })
}

const updatePlaylist = (req, res) => {
    console.log('updating:')
    console.log(req.body)
    User.updateOne({ email: req.body.user, 'playlists.name': req.body.playlist_name },
        {
            '$set': {
                'playlists.$.name': req.body.playlist_newName,
                'playlists.$.img': req.body.playlist_img,
            }
        }, (err) => {
            if (err) return res.status(500).send('sign up failed :(')
            res.status(200).send(req.body.playlist_name)
        })
}

const deletePlaylist = (req, res) => {
    console.log('deleted: ')
    console.log(req.body)
    User.updateOne({ email: req.body.user },
        {
            $pull: {
                playlists: {
                    name: req.body.playlist_name,
                },
            }
        }, (err) => {
            if (err) return res.status(500).send('sign up failed :(')
            res.status(200).send(req.body.playlist_name)
        })
}



module.exports = {
    signup,
    login,
    updateName,
    updateEmail,
    getPlaylists,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
}

// const getUsers = (req, res) => {
//     // res.json(Todos);
//     User.find({}, (err, data) => {
//         res.json(data)
//     })
// }

// const createUser = (req, res) => {
//     const user = new User()
//     user.name = req.body.name
//     user.password = req.body.pwd
//     user.avatar = req.body.avt
//     user.save((err, data) => {
//         if (err) return res.status(400).send('Something went wrong :( ' + err);
//         res.status(201).send('Created successfully')
//     })
//     // res.send();
// }

// const getUserById = (req, res) => {
//     let user = Users.filter(item => item.id == request.params.id)
//     res.json(user)
// }

// module.exports = {
//     getUsers,
//     createUser,
//     getUserById,
// }

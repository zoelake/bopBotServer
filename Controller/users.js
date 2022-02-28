const User = require('../Models/user');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
    const user = new User();
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password
    user.avatar = req.body.avatar
    user.save((err, done) => {
        if (err) return res.status(500).send('sign up failed :(')
        res.status(201).send('signed up successfully!')
    })
}

const login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) return res.status(404).send('user not found :(')
console.log(user)
        if (user.comparePassword(req.body.password)) {
            const token = jwt.sign({ id: user._id }, 'thisismysecret');
            res.send(token)
        } else {
            res.send('could not login')
        }
    })
}

module.exports = {
    signup,
    login
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

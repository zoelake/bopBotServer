const User = require('../Models/user');

const getUsers = (req, res) => {
    // res.json(Todos);
    User.find({}, (err, data) => {
        res.json(data)
    })
}

const createUser = (req, res) => {
    const user = new User()
    user.name = req.body.name
    user.psw = req.body.psw
    user.avt = req.body.avt
    user.save((err, data) => {
        if(err) return res.status(400).send('Something went wrong :( ' + err);
        res.status(201).send('Created successfully')
    })
    // res.send();
}

const getUserById = (req, res) => {
    let user = Users.filter(item => item.id == request.params.id)
    res.json(user)
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
}

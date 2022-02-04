const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  name: String,
  password: String,
  avatar: String,
});

const User = mongoose.model('User', UserSchema)

const getUsers =  (req, res) => {
    // res.json(Todos);
    User.find({},(err,data)=>{
        res.json(data)
    })
}

const createUser = (req,res)=>{
    const user = new User()
    user.name = req.body.name
    user.password = req.body.password
    user.avatar = req.body.avatar
    playlist.save()
}

const getUserById = (req,res)=>{
    let user = Users.filter(item => item.id == request.params.id)
    res.json(user)
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
}

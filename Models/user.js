const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: String,
    psw: String,
    avt: String,
});

// PlaylistSchema.pre('save', function (next) {
//     let d = new Date(this.date)
//     this.day = d.toDateString().slice(0, 3)
//     next();
// })

const User = mongoose.model('User', UserSchema)

module.exports = User;
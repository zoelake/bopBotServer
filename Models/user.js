const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    playlists: [{ type: ObjectId, ref: 'playlists' }],
}, { timestamps: true });

UserSchema.pre('save', function (next) {

    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            // Store hash in your password DB.
            user.password = hash
            next()
        });
    });

})

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', UserSchema)

module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlaylistSchema = new Schema({
    name: { type: String, default: 'Untitled Playlist', unique: true },
    tracks: { type: [], default: [] },
    img: String,
    date: Date,
    public: { type: Boolean, default: true },
});

// PlaylistSchema.pre('save', function (next) {
//     let d = new Date(this.date)
//     this.day = d.toDateString().slice(0, 3)
//     next();
// })

const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist;
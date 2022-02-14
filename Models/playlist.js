const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlaylistSchema = new Schema({
    name: { type: String, default: 'Untitled Playlist', unique: true },
    tracks: { type: [], default: [] },
    img: String,
    public: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, { timestamps: true });


const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist;
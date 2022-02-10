const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlaylistSchema = new Schema({
    name: { type: String, default: 'Untitled Playlist', unique: true },
    tracks: { type: [], default: [] },
    img: String,
    public: { type: Boolean, default: true },
}, {timestamps:true});


const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist;
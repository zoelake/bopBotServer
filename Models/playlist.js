const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Track = require('../Models/track').schema

const PlaylistSchema = new Schema({
    name: { type: String, default: 'Untitled Playlist', unique: true },
    tracks: [Track],
    img: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    }
});


const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist;
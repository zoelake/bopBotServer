const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlaylistSchema = new Schema({
    name: { type: String, default: 'Untitled Playlist', unique: true },
    tracks: [{type: ObjectId, ref:'tracks'}],
    img: String,
    createdAt:{
        type:Date,
        default: () => Date.now(),
        immutable:true,
    },
    updatedAt: {
        type:Date,
        default: () => Date.now(),
    }
});


const Playlist = mongoose.model('Playlist', PlaylistSchema)

module.exports = Playlist;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const playlistSchema = new Schema({
  name: String,
  tracks: Array,
  img: String,
  date: Date.now,
  public: Boolean,
});

const Playlist = mongoose.model('Playlist', PlaylistSchema)

const getPlaylists =  (req, res) => {
    // res.json(Todos);
    Playlist.find({},(err,data)=>{
        res.json(data)
    })
}

const createPlaylist = (req,res)=>{
    const playlist = new Playlist()
    playlist.name = req.body.name
    playlist.tracks = req.body.tracks
    playlist.img = req.body.img
    playlist.date = req.body.date
    playlist.public = req.body.public
    playlist.save()
}

const getPlaylistById = (req,res)=>{
    let playlist = Playlists.filter(item => item.id == request.params.id)
    res.json(playlist)
}

module.exports = {
    getPlaylists,
    createPlaylist,
    getPlaylistById,
}

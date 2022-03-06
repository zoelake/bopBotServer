const Playlist = require('../Models/playlist')

const getPlaylists = (req, res) => {
    // res.json(Todos);
    Playlist.find({}, (err, playlists) => {
        res.json(data)
    })
}

const createPlaylist = (req, res) => {
    const playlist = new Playlist()
    playlist.name = req.body.name
    playlist.tracks = req.body.tracks
    playlist.img = req.body.img
    playlist.date = req.body.date
    playlist.public = req.body.public
    playlist.owner = req.body.owner
    playlist.save((err, data) => {
        if (err) return res.status(400).send('Something went wrong :(');
        res.status(201).send('Created successfully')
    })
    // res.send();
}

const getPlaylistById = (req, res) => {
    let playlist = Playlist.filter(item => item.id == request.params.id)
    res.json(playlist)
}

const addToLikedPlaylist = (req, res) => {
    let likedPlaylist = Playlist.findOneAndUpdate({
        name: 'Liked'
    }, {
        $push: {
            tracks: req.body.track,
        },
    })
    res.json(likedPlaylist)
}

module.exports = {
    getPlaylists,
    createPlaylist,
    getPlaylistById,
    addToLikedPlaylist,
}

const Playlist = require('../Models/playlist')
const User = require('../Models/user')

// create a new playlist with a name & cover img
const createPlaylist = (req, res) => {
    User.updateOne({ email: req.body.user },
        {
            $addToSet: {
                playlists: {
                    name: req.body.playlist_name,
                    img: req.body.playlist_img,
                },
            }
        }, (err, user) => {
            if (err || !user) return res.status(500).send('something went wrong')
            res.status(200).send(`${req.body.playlist_name} was created!`)
        })
}

//load current users playlists
const getPlaylists = (req, res) => {
    // console.log(`getting ${req.body.user}'s playlists`)
    User.findOne({ email: req.body.user }, (err, user) => {
        if (err) return res.status(500).send('server error')
        if (user) {
            return res.status(200).send(user)
        }
    })
}

// retrieve a single playlist
const getAPlaylist = (req, res) => {
    console.log(`getting playlist with an id of ${req.body.playlist_id}`)
    User.where({ 'playlists._id': `ObjectId("${req.body.playlist_id}")` }, (err, playlist) => {
        if (err || !playlist) return res.status(500).send('something went wrong')
        res.status(200).send(playlist)
    })

}


//updating existing selected playlist's name and/or cover img
const updatePlaylist = (req, res) => {
    console.log('updating:')
    console.log(req.body)
    if (req.body.playlist_newName !== null) {

        User.updateOne({ email: req.body.user, 'playlists.name': req.body.playlist_name },

            {
                '$set': {
                    'playlists.$.name': req.body.playlist_newName,
                    'playlists.$.img': req.body.playlist_newImg,
                }
            }, (err, user) => {
                if (err || !user) return res.status(500).send('something went wrong')
                res.status(200).send(`${req.body.playlist_name} was updated to ${req.body.playlist_newName}`);
            })
    } else {
        User.updateOne({ email: req.body.user, 'playlists.name': req.body.playlist_name },

            {
                '$set': {
                    'playlists.$.img': req.body.playlist_newImg,
                }
            }, (err, user) => {
                if (err || !user) return res.status(500).send('something went wrong')
                res.status(200).send(`${req.body.playlist_name} was updated to ${req.body.playlist_newName}`);
            })
    }
}

// delete selected playlist 
const deletePlaylist = (req, res) => {
    console.log('deleting: ')
    console.log(req.body)
    User.updateOne({ email: req.body.user },
        {
            $pull: {
                playlists: {
                    name: req.body.playlist_name,
                },
            }
        }, (err, user) => {
            if (err || !user) return res.status(500).send('something went wrong')
            res.status(200).send(`${req.body.playlist_name} was deleted`)
        })
}



//unused functions (within front-end)

//get a playlist by its id
const getPlaylistById = (req, res) => {
    let playlist = Playlist.filter(item => item.id == request.params.id)
    res.json(playlist)
}

module.exports = {
    getPlaylists,
    getAPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getPlaylistById,
}


const { request } = require('express')
const Track = require('../Models/track')
const User = require('../Models/user')

const getTracks = (req, res) => {
    console.log('loading tracks')
    Track.find({}, (err, tracks) => {
        console.log(tracks)
        if (err) return res.status(409).send('something went wrong')
        res.status(200).send(tracks)
    }).limit(10)
}

const getTrackById = (req, res) => {
    let track = Track.filter(item => item.id == request.params.id)
    res.json(track)
}


const makeTrack = (req, res) => {
    Track.findOne({ Title: req.body.Title }, (err, track) => {
        if (track) {
            return res.status(409).send("track already exists")
        } else {
            const track = new Track();
            track.Title = req.body.Title
            track.Artist = req.body.Artist
            track.save((err, done) => {
                if (err) return res.status(500).send('track failed :(')
                res.status(201).send('track added successfully!')
            })
        }
    })
}


const addTrackToLiked = (req, res) => {
    console.log(`adding ${req.body.track.Title} to likes!`)
    User.updateOne({ email: req.body.user },
        {
            $push: {
                liked: req.body.track,
            }
        }, (err) => {
            if (err) return res.status(500).send('something went wrong')
            res.status(200).send(` ${req.body.track.Title} was added to likes!`)
        })

}

const deleteTrackFromLiked = (req, res) => {
    console.log(`deleting ${req.body.track.Title} from likes!`)
    User.updateOne({ email: req.body.user },
        {
            $pull: {
                liked: {
                    Title: req.body.track.Title,
                },
            }
        }, (err) => {
            if (err) return res.status(500).send('something went wrong')
            res.status(200).send(` ${req.body.track.Title} was deleted from likes!`)
        })

}

const deleteTrackFromPlaylist = (req, res) => {
    console.log(req.body)
    console.log(`deleting ${req.body.track.Title} from ${req.body.playlist_name}!`)
    User.updateOne({ email: req.body.user, 'playlists.name': req.body.playlist_name },
        {
            '$pull': {
                'playlists.$.tracks': {
                    Title: req.body.track.Title
                }
            }
        }, (err) => {
            if (err) return res.status(500).send('something went wrong')
            res.status(200).send(`track was deleted from ${req.body.playlist_name}`)
        })

}

const addTrackToPlaylist = (req, res) => {
    console.log(`adding ${req.body.track.Title} to ${req.body.playlist_name}!`)
    User.updateOne({ email: req.body.user, 'playlists.name': req.body.playlist_name },
        {
            $push: {
                'playlists.$.tracks': req.body.track,
            }
        }, (err) => {
            if (err) return res.status(500).send('something went wrong')
            res.status(200).send(`${req.body.track.Title} was added to ${req.body.playlist_name}`)
        })

}




module.exports = {
    getTracks,
    getTrackById,
    makeTrack,
    addTrackToLiked,
    deleteTrackFromLiked,
    addTrackToPlaylist,
    deleteTrackFromPlaylist,
}




// Track.find({}, function (err, tracks) {
    //     var trackMap = {};
    //     console.log('looking for tracks...')
    //     tracks.forEach(function (track) {
    //         trackMap = track;
    //     });
    //     console.log(trackMap)
    //     res.status(201).send(trackMap)
    // })
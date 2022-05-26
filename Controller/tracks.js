
const { request } = require('express')
const Track = require('../Models/track')
const User = require('../Models/user')

//get all tracks from the database
const getTracks = (req, res) => {
    console.log('loading tracks')
    Track.find({}, (err, tracks) => {
        if (err) return res.status(409).send('server error')
        console.log(tracks)
        res.status(200).send(tracks)
    }).limit(100)
}

//add selected track to likes playlist
const addTrackToLiked = (req, res) => {
    console.log(`adding ${req.body.track.Title} to likes!`)
    User.updateOne({ email: req.body.user },
        {
            $push: {
                liked: req.body.track,
            }
        }, (err) => {
            if (err) return res.status(500).send('server error')
            res.status(200).send(` ${req.body.track.Title} was added to likes!`)
        })
}

//delete selected track from likes playlist
const deleteTrackFromLiked = (req, res) => {
    console.log(`deleting ${req.body.track.Title} from likes!`)
    User.updateOne({ email: req.body.user },
        {
            $pull: {
                liked: {
                    _id: req.body.track._id,
                },
            }
        }, (err) => {
            if (err) return res.status(500).send('server error')
            res.status(200).send(` ${req.body.track.Title} was deleted from likes!`)
        })

}

// remove selected track from selected playlist
const deleteTrackFromPlaylist = (req, res) => {
    console.log(`deleting ${req.body.track.Title} from ${req.body.playlist_name}!`)
    User.updateOne({ email: req.body.user, 'playlists.name': req.body.playlist_name },
        {
            '$pull': {
                'playlists.$.tracks': {
                    _id: req.body.track._id
                }
            }
        }, (err) => {
            if (err) return res.status(500).send('server error')
            res.status(200).send(`${req.body.track.Title} was deleted from ${req.body.playlist_name}`)
        })

}

//add selected track to selected playlist
const addTrackToPlaylist = (req, res) => {
    console.log(`adding ${req.body.track.Title} to ${req.body.playlist_name}!`)
    User.updateOne({ email: req.body.user, 'playlists.name': req.body.playlist_name },
        {
            $push: {
                'playlists.$.tracks': req.body.track,
            }
        }, (err) => {
            if (err) return res.status(500).send('server error')
            res.status(200).send(`${req.body.track.Title} was added to ${req.body.playlist_name}`)
        })

}

const filterTrackGenres = (req, res) => {
    console.log(req.body)
    Track.find({ Genre: req.body.Genre }, (err, tracks) => {
        if (err) return res.status(500).send('something went wrong with the server');
        if (tracks = []) return res.status(409).send(`No tracks for ${req.body.genre} could be found`);
        else {
            console.log(tracks)
            res.status(200).send(tracks)
        };
    })
}

const filterTrackValues = (req, res) => {
    console.log(req.body)
    const filter = req.body.filter;
    Track.find({ [req.body.filter]: { $gte: req.body.value } }, (err, tracks) => {
        if (err) return res.status(500).send('something went wrong with the server');
        if (tracks == []) return res.status(409).send(`No tracks for ${filter} could be found`);
        else {
            console.log(tracks)
            res.status(200).send(tracks)
        };
    })
}

const filterTracks = (req, res) => {
    console.log(req.body)
    Track.find({ Genre: req.body.Genre, acoustics: { $gte: req.body.acoustics }, danceability: { $gte: req.body.danceability }, energy: { $gte: req.body.energy }, instrumentalness: { $gte: req.body.instrumentalness }, loudness: { $gte: req.body.loudness }, tempo: { $gte: req.body.tempo } }, (err, tracks) => {
        if (err) return res.status(500).send('something went wrong with the server');
        if (!tracks) return res.status(409).send(`No tracks matching params could be found`);
        else {
            console.log(tracks)
            res.status(200).send(tracks)
        }
    })
}

//unused functions (within front-end)

const getTrackById = (req, res) => {
    let track = Track.filter(item => item.id == request.params.id)
    res.json(track)
}

const makeTrack = (req, res) => {
    Track.findOne({ Title: req.body.Title }, (err, track) => {
        if (err) return res.status(500).send('something went wrong with the server')
        if (track) return res.status(409).send(`${req.body.Title} already exists`)
        else {
            const track = new Track();
            track.Title = req.body.Title
            track.Artist = req.body.Artist
            track.save((err, done) => {
                if (err) return res.status(500).send(`${req.body.Title} failed to save :(`)
                res.status(201).send(`${req.body.Title} track added successfully!`)
            })
        }
    })
}


module.exports = {
    getTracks,
    addTrackToLiked,
    deleteTrackFromLiked,
    addTrackToPlaylist,
    deleteTrackFromPlaylist,
    //unused functions (within front-end)
    getTrackById,
    makeTrack,
    //filtering (wip)
    filterTrackGenres,
    filterTrackValues,
    filterTracks
}




// $and: [
//     { Genre: req.body.Genre },
//     { [req.body.acoustics]: { $gte: req.body.acoustics } },
//     { [req.body.danceability]: { $gte: req.body.danceability } },
//     { [req.body.energy]: { $gte: req.body.energy } },
//     { [req.body.instrumentalness]: { $gte: req.body.instrumentalness } },
//     { [req.body.loudness]: { $gte: req.body.loudness } },
//     { [req.body.tempo]: { $gte: req.body.tempo } },
// ]
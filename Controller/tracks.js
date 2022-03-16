
const Track = require('../Models/track')

const getTracks = (req, res) => {
    console.log('loading tracks')
    Track.find({}, (err, tracks) => {
        res.status(200).send(tracks)
        console.log(tracks)
        // res.status(201).send(trackMap)
    })
    // Track.find({}, function (err, tracks) {
    //     var trackMap = {};
    //     console.log('looking for tracks...')
    //     tracks.forEach(function (track) {
    //         trackMap = track;
    //     });
    //     console.log(trackMap)
    //     res.status(201).send(trackMap)
    // })
}

const getTrackById = (req, res) => {
    let track = Track.filter(item => item.id == request.params.id)
    res.json(track)
}

const makeTrack = (req, res) => {
    Track.findOne({ Title: req.body.Title }, (err, track) => {
        if (track) {
            return res.status(409).send("trakc already exists")
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


module.exports = {
    getTracks,
    getTrackById,
    makeTrack,
}

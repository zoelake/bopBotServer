
const Track = require('../Models/track')

const getTracks = (req, res) => {
    console.log('loading tracks')
    Track.find({}, (err, tracks) => {
        console.log(tracks)
        if (err) return res.status(409).send('something went wrong')
        res.status(200).send(tracks)
    })
    // .limit(10)

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


module.exports = {
    getTracks,
    getTrackById,
    makeTrack,
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

const Track = require('../Models/track')


const getTrackById = (req, res) => {
    let track = Track.filter(item => item.id == request.params.id)
    res.json(track)
}


module.exports = {
    getTrackById,
}

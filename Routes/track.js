const express = require('express');
const router = express.Router();
const { getTracks, getTrackById, makeTrack } = require('../Controller/tracks');

//get all tracks
router.get('/tracks', getTracks)

router.post('/new-track', makeTrack)


//get track by id
router.get('/track/:id', getTrackById)







module.exports = router;
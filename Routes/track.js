const express = require('express');
const router = express.Router();
const { getTracks, getTrackById, makeTrack, addTrackToLiked, addTrackToPlaylist } = require('../Controller/tracks');

//get all tracks
router.get('/tracks', getTracks)

router.post('/new-track', makeTrack)


//get track by id
router.get('/track/:id', getTrackById)

router.post('/tracks-add-liked', addTrackToLiked)
router.post('/tracks-add-playlist', addTrackToPlaylist)





module.exports = router;
const express = require('express');
const router = express.Router();
const { getTracks, getTrackById, makeTrack, addTrackToLiked, addTrackToPlaylist, deleteTrackFromLiked, deleteTrackFromPlaylist } = require('../Controller/tracks');

//get all tracks
router.get('/tracks', getTracks)

router.post('/new-track', makeTrack)


//get track by id
router.get('/track/:id', getTrackById)

router.post('/tracks-add-liked', addTrackToLiked)
router.post('/tracks-delete-liked', deleteTrackFromLiked)
router.post('/tracks-add-playlist', addTrackToPlaylist)
router.post('/tracks-remove-playlist', deleteTrackFromPlaylist)





module.exports = router;
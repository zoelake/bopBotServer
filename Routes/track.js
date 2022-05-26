const express = require('express');
const router = express.Router();
const { getTracks, makeTrack, addTrackToLiked, addTrackToPlaylist, deleteTrackFromLiked, deleteTrackFromPlaylist, filterTracks, filterTrackGenres, filterTrackValues } = require('../Controller/tracks');

//GET ALL
router.get('/tracks', getTracks)

//CREATE TRACK
router.post('/new-track', makeTrack)

//ADD TO LIKED PLAYLIST
router.post('/tracks-add-liked', addTrackToLiked)
//REMOVE FROM LIKED PLAYLIST
router.post('/tracks-delete-liked', deleteTrackFromLiked)

//ADD TO PLAYLIST
router.post('/tracks-add-playlist', addTrackToPlaylist)
//REMOVE FROM  PLAYLIST
router.post('/tracks-remove-playlist', deleteTrackFromPlaylist)

//FILTERING
router.get('/tracks-filter-genre', filterTrackGenres)
router.get('/tracks-filter-value', filterTrackValues)
router.get('/tracks-filter', filterTracks)

module.exports = router;
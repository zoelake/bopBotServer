const express = require('express');
const router = express.Router();
const { getPlaylists, getAPlaylist, createPlaylist, updatePlaylist, deletePlaylist } = require('../Controller/playlists');
// const authorizeUser = require('../Auth/auth')


//GET ALL
router.post('/get-playlists', getPlaylists)

//GET ONE
router.post('/get-a-playlist', getAPlaylist)
//CREATE PLAYLIST
router.post('/create-playlist', createPlaylist)
//UPDATE PLAYLIST
router.post('/update-playlist', updatePlaylist)
//DELETE PLAYLIST
router.post('/delete-playlist', deletePlaylist)


module.exports = router;
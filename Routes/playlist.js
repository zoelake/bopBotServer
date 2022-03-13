const express = require('express');
const router = express.Router();
const { getPlaylists, createPlaylist, getPlaylistById, addToLikedPlaylist } = require('../Controller/playlists');
const authorizeUser = require('../Auth/auth')



// router.get('/playlist/:id', getPlaylistById)

//load playlists after authorizing user
router.get('/playlists', authorizeUser, getPlaylists)

//create a new playlist
router.post('/new/playlist', createPlaylist)

//add tracks to liked playlist?
router.patch('new/playlist/liked', addToLikedPlaylist)



module.exports = router;
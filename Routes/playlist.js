const express = require('express');
const router = express.Router();
const {getPlaylists, createPlaylist, getPlaylistById} = require('../Controller/playlists');
const authorizeUser = require('../Auth/auth')




router.get('/playlists',authorizeUser, getPlaylists)

router.post('/new/playlist', createPlaylist)


router.get('/playlist/:id', getPlaylistById)

module.exports = router;
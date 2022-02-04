// const { request } = require('express'); i think i put this in accidentally?
const express = require('express');
const router = express.Router();
const {getPlaylists, createPlaylist, getPlaylistById} = require('../Controller/playlist');



router.get('/playlists', getPlaylists)

router.post('/new/playlist', createPlaylist)


router.get('/playlist/:id', getPlaylistById)

module.exports = router;
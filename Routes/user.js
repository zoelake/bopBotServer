const express = require('express');
const router = express.Router();
const { signup, login, updateName, updateEmail, getPlaylists, createPlaylist, updatePlaylist, deletePlaylist } = require('../Controller/users')
// const {getUsers, createUser, getUserById} = require('../Controller/users');

// router.get('/users', getUsers)
// router.post('/new/user', createUser)
// router.get('/user/:id', getUserById)

//sign user in 
router.post('/signup', signup)


//create new user
router.post('/login', login)

//UPDATE USER
router.post('/update-userName', updateName)
router.post('/update-userEmail', updateEmail)

//PLAYLISTS
router.get('/get-playlists', getPlaylists)
router.post('/create-playlist', createPlaylist)
router.post('/delete-playlist', deletePlaylist)
router.post('/update-playlist', updatePlaylist)


module.exports = router;
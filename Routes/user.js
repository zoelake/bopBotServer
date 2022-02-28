const express = require('express');
const router = express.Router();
const {signup, login} = require('../Controller/users')
// const {getUsers, createUser, getUserById} = require('../Controller/users');

// router.get('/users', getUsers)
// router.post('/new/user', createUser)
// router.get('/user/:id', getUserById)

router.post('/signup', signup)
router.post('/login', login)

module.exports = router;
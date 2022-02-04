const express = require('express');
const router = express.Router();
const {getUsers, createUser, getUserById} = require('../Controller/user');



router.get('/users', getUsers)

router.post('/new/user', createUser)


router.get('/user/:id', getUserById)

module.exports = router;
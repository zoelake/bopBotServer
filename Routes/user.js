const express = require('express');
const router = express.Router();
const { signup, login, updateName, updateEmail, updatePassword, } = require('../Controller/users')



//SIGN USER IN
router.post('/signup', signup)

//CREATE USER
router.post('/login', login)

//UPDATE USER
router.post('/update-userName', updateName)
router.post('/update-userEmail', updateEmail)
router.post('/update-userPassword', updatePassword)

module.exports = router;

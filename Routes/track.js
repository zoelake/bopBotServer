const express = require('express');
const router = express.Router();
const { getTrackById } = require('../Controller/tracks');



//get track
router.get('/track/:id', getTrackById)







module.exports = router;
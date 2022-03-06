const express = require('express')
const app = express();
const cors = require('cors')
const playlistRouter = require('./Routes/playlist.js');
const userRouter = require('./Routes/user.js');
const mongoose = require('mongoose');
const config = require('./config')


mongoose.connect(config.MONGODB_URL, (e) => {
    console.log('db error?' + e)
})

app.use(cors());
app.use(express.json())

app.use(playlistRouter);
app.use(userRouter);
app.listen(3001, () => console.log('server running on 3001!!!'));
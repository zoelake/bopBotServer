const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

const playlistRouter = require('./Routes/playlist.js');
const userRouter = require('./Routes/user.js');
const trackRouter = require('./Routes/track.js');
const config = require('./config')


mongoose.connect(config.MONGODB_URL, (e) => {
   if (e) return console.log(e)
})

app.use(cors());


app.use(express.json())

app.use(playlistRouter);
app.use(userRouter);
app.use(trackRouter);
app.listen(3001, () => console.log('server live @ 3001'));

const express = require('express')
const app = express();
const playlistRouter = require('./Routes/playlist');
const userRouter = require('./Routes/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playlist', (e) => {
    console.log('db error? '+ e)
})

app.use(express.json())

app.use(playlistRouter);
app.listen(3000, ()=> console.log('server running on 3000'));
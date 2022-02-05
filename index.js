const express = require('express')
const app = express();
const playlistRouter = require('./Routes/playlist.js');
// const userRouter = require('./Routes/user.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playlist', (e) => {
    console.log('db error? playlist'+ e)
})
// mongoose.connect('mongodb://localhost/user', (e) => {
//     console.log('db error? user '+ e)
// })


app.use(express.json())

app.use(playlistRouter);
// app.use(userRouter);
app.listen(3000, ()=> console.log('server running on 3000!!!'));
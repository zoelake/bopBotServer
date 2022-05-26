const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

const playlistRouter = require('./Routes/playlist.js');
const userRouter = require('./Routes/user.js');
const trackRouter = require('./Routes/track.js');

mongoose.connect(process.env.MONGODB_URL, (e) => {
   if (e) return console.log(e)
   //validate that it was connected
})

app.use(cors());


app.use(express.json())

app.use(playlistRouter);
app.use(userRouter);
app.use(trackRouter);

//move this out of index.js (or delete) => match the pattern
app.get("/", function (req, res) {
   res.send("<h1>Welcome to bopBot's backend :)</h1>")
})


app.listen(process.env.PORT || 3001, () => console.log('server is live'));


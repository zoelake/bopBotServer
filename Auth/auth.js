const jwt = require('jsonwebtoken')


const authorizeUser = (req, res, next) => {
    jwt.verify(req.query.token, process.env.AUTH_KEY, (err, data) => {
        if (err) return res.send('not authorized')
        req.user = data
        next()
    })
}

module.exports = authorizeUser;
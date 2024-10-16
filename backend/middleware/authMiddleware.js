const jwt = require('jsonwebtoken')

exports.verifyToken = (req, rest, next) => {
    const token = req.headers['authorization']
    if (!token)
        res.status(403).json({ message: 'No token' })
    jwt.verify(token.split(' ')[1], 'jwt_secret', (err, decoded) => {
        if (err)
            res.status(500).json({ message: 'Invalid token' })
        req.userId = decoded.id
        next()
    })
}
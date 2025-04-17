
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Attach email from payload to request object
        req.email = decoded.email;
        next();
    });
}
module.exports = verifyToken;
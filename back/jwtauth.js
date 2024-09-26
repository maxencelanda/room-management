const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const tokenStr = token.split(' ')[1]
        const decoded = jwt.verify(tokenStr, process.env.TOKEN_SECRET);
        req.idUtilisateur = decoded.idUtilisateur;
        req.idRole = decoded.idRole;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken
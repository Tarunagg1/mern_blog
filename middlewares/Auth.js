const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split('Bearer ')[1];
    try {
        const res = await jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json({ errors: [{ msg: error.message }] });
    }
}
const jwt = require('jsonwebtoken');

const { encrypt, decrypt } = require('../utils');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        let data = decrypt(decoded.data);
        
        let newToken = jwt.sign({ data: encrypt(data) }, process.env.JWT_KEY, {
            expiresIn: '1h'
        });

        req.newToken = newToken;

        next();
    } catch (error) {
        console.log('error: ', error);
        return res.status(401).json({ message: 'Authentication failed.' });
    }
};

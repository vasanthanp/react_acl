const jwt = require('jsonwebtoken');
const { Permission } = require('../config/api');
const { SECRET_KEY } = require('../config/index')
const authenticate = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (token) token = token.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: `You must be logged in`
            })
        }
        jwt.verify(token, SECRET_KEY, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    message: `You must be logged in`
                })
            }
            delete payload['exp']
            delete payload['iat']
            req.user = payload;
            next();
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: `Internal Server Error`
        })
    }
}
const authorizeRoute = controller => (req, res, next) => {
    try{
        const role = req.user.role;
        if (role == 'admin') return next();
        Permission[role].find(route => route === controller)
            ? next()
            : res.status(401).json({ status: 401, message: 'UnAuthorized Access' })
    } catch (err) {
        console.log(err)
        res.status(500).message({ status: 500, message: `Internal Server Error` })
    }
}
module.exports = { authenticate, authorizeRoute }
/* const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
export {};

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async( error, decodedToken) => {
            if (error) {
                res.locals.user = null;
                next()
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        res.status(200).json({ error: "no valid token found"})
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
            if(error) {
                console.log(error);
            } else {
                console.log(decodedToken.id);
                next();
            }
        })
    } else {
        console.log('no token');
    }
} */
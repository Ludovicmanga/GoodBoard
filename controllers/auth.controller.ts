const userModel = require('../models/user.model');
export {}
const jwt = require('jsonwebtoken');
const { signUpErrors, loginErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 1000;

const createToken = (id: number) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signUp = (req, res) => {
    const {pseudo, email, password, type} = req.body;
    const user = new userModel({pseudo, email, password, type});

    user.save()
        .then(user => res.status(201).json({ user: user._id }))
        .catch (error => {
            const formattedErrors = signUpErrors(error);
            res.status(200).json( error );
        })
}

/* module.exports.login = (req, res) => {
    const {email, password} = req.body;
    const user = userModel.login(email, password)
        .then(
            user => {
                const token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge });
                res.status(200).json({ user: user._id});
            }
        )
        .catch(error => {
            const formattedErrors = loginErrors(error);
            res.status(200).json({ formattedErrors });
        });

} */

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, loginErrors } = require('../utils/errors.utils');

module.exports.signUp = (req, res) => {
    const {pseudo, email, password, type} = req.body;
    const user = new userModel({pseudo, email, password, type});

    user.save()
        .then(user => res.status(201).json({ user: user._id }))
        .catch (error => {
            const formattedErrors = signUpErrors(error);
            res.status(200).json( formattedErrors );
        })
}

module.exports.login = (req, res) => {
    const {email, password} = req.body;
    const user = userModel.login(email, password);

}

module.exports.logout = (req, res) => {
    
}
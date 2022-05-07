const ObjectId = require('mongoose').Types.ObjectId;
const userModel = require('../models/user.model');
export {};

module.exports.getUser = (req, res) => {    
    if(!ObjectId.isValid(req.params.id)) 
        return res.status(400).send('ID unknown ' + req.params.id)

   userModel.findById(req.params.id).select('-password')
        .then(user => res.status(200).send(user))
        .catch(error => res.status(200).send(error))
}
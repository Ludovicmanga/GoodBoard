const featureRequestModel = require('../models/featureRequest.model');

module.exports.getAllFeatureRequests = async (req, res) => {
    console.log('heey') 

    const allFeatureRequests = await featureRequestModel.find()
        .then(allFeatureRequests => res.status(200).send(allFeatureRequests));
}
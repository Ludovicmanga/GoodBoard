const featureRequestModel = require('../models/featureRequest.model');

module.exports.getAllFeatureRequests = async (req, res) => {
    await featureRequestModel.find()
        .then(allFeatureRequests => res.status(200).send(allFeatureRequests));
}

module.exports.getAllCompanyFeatureRequests = async (req, res) => {
    console.log("ahahiih")
    await featureRequestModel.find({ creatorType: "company" })
        .then(allCompanyFeatureRequests => res.status(200).send(allCompanyFeatureRequests));
}

module.exports.getAllUserFeatureRequests = async (req, res) => {
    await featureRequestModel.find({ creatorType: "user" })
        .then(allUserFeatureRequests => res.status(200).send(allUserFeatureRequests));
}

module.exports.createFeatureRequest = (req, res) => {
    const newFeatureRequest = new featureRequestModel({
        title: req.body.title,
        details: req.body.details,
        votes: 0,
        creatorType: req.body.creatorType,
        status: req.body.status
    });

    newFeatureRequest.save()
        .then(featureRequest => res.status(200).send(featureRequest))
        .catch(error => console.log(error))
}
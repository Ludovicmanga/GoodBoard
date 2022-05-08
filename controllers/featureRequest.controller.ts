const featureRequestModel = require('../models/featureRequest.model');
const ObjectId = require('mongoose').Types.ObjectId;
const userModel = require('../models/user.model');

module.exports.getAllFeatureRequests = async (req, res) => {
    await featureRequestModel.find()
        .then(allFeatureRequests => res.status(200).send(allFeatureRequests));
}

module.exports.getAllCompanyFeatureRequests = async (req, res) => {
    await featureRequestModel.find({ creatorType: "company" })
        .then(allCompanyFeatureRequests => res.status(200).send(allCompanyFeatureRequests));
}

module.exports.getAllUserFeatureRequests = async (req, res) => {
    await featureRequestModel.find({ creatorType: "user" })
        .then(allUserFeatureRequests => res.status(200).send(allUserFeatureRequests));
}

module.exports.createFeatureRequest = (req, res) => {
    console.log(req.body.title)
    const newFeatureRequest = new featureRequestModel({
        title: req.body.title,
        details: req.body.details,
        creatorType: req.body.creatorType,
        status: req.body.status
    });

    newFeatureRequest.save()
        .then(featureRequest => res.status(200).send(featureRequest))
        .catch(error => console.log(error))
}

module.exports.upVote = (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.userId))
      return res.status(400).send("ID unknown : " + req.params.id);

    featureRequestModel.updateOne(
        { _id: req.params.id },
        { $addToSet: { voters: req.body.userId } }
    )
        .then(featureRequest => res.status(200).send(featureRequest))
        .catch(error => res.status(400).json({ error }));

    userModel.updateOne(
        { _id: req.body.userId },
        { $addToSet: { voted: req.params.id } }
    )
        .catch(error => res.status(400).json({ error }));
}

module.exports.downVote = (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.userId))
      return res.status(400).send("ID unknown : " + req.params.id);

      featureRequestModel.updateOne(
        { _id: req.params.id },
        { $pull: { voters: req.body.userId } }
    )
        .then(featureRequest => res.status(200).send(featureRequest))
        .catch(error => res.status(400).json({ error }));
    
    userModel.updateOne(
        { _id: req.body.userId },
        { $pull: { voted: req.params.id } }
    )
        .catch(error => res.status(400).json({ error }));
}
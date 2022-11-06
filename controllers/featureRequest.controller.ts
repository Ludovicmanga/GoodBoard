import featureRequestModel from '../models/featureRequest.model';
import mongoose from 'mongoose';
import userModel from '../models/user.model';

const ObjectId = mongoose.Types.ObjectId;

export const getAllFeatureRequests = async (req, res) => {
    await featureRequestModel.find()
        .then(allFeatureRequests => res.status(200).send(allFeatureRequests));
}

export const getAllCompanyFeatureRequests = async (req, res) => {
    await featureRequestModel.find({ creatorType: "company" })
        .then(allCompanyFeatureRequests => res.status(200).send(allCompanyFeatureRequests));
}
export const getAllUserFeatureRequests = async (req, res) => {
    await featureRequestModel.find({ creatorType: "user" })
        .then(allUserFeatureRequests => res.status(200).send(allUserFeatureRequests));
}

export const createFeatureRequest = (req, res) => {
    const newFeatureRequest = new featureRequestModel({
        title: req.body.title,
        details: req.body.details,
        creatorType: req.body.creatorType,
        status: req.body.status,
        creator: req.body.creator
    });

    newFeatureRequest.save()
        .then(featureRequest => res.status(200).send(featureRequest))
        .catch(error => console.log(error))
}

export const upVote = async (req, res) => {
    const updatedFeatureRequest = await featureRequestModel.updateOne(
        { _id: req.params.id },
        { $addToSet: { voters: req.body.userId } }
    )

    await userModel.updateOne(
        { _id: req.body.userId },
        { $addToSet: { voted: req.params.id } }
    )
    
    res.status(200).json({ updatedFeatureRequest });
}

export const downVote = async (req, res) => {
    const updatedFeatureRequest = await featureRequestModel.updateOne(
        { _id: req.params.id },
        { $pull: { voters: req.body.userId } }
    )

    console.log(req.body, ' is the body')

    await userModel.updateOne(
        { _id: req.body.userId },
        { $pull: { voted: req.params.id } }
    )

    res.status(200).json({ updatedFeatureRequest });
}

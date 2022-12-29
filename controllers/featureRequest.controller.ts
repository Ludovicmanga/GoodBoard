import featureRequestModel from "../models/featureRequest.model";
import mongoose from "mongoose";
import userModel from "../models/user.model";
import { request } from "express";

const ObjectId = mongoose.Types.ObjectId;

export const getAllFeatureRequests = async (req, res) => {
  console.log('I am logged 2 as ', req.user);
  await featureRequestModel
    .find()
    .then((allFeatureRequests) => res.status(200).send(allFeatureRequests));
};

export const getAllCompanyFeatureRequests = async (req, res) => {
  await featureRequestModel
    .find({ creatorType: "company" })
    .then((allCompanyFeatureRequests) =>
      res.status(200).send(allCompanyFeatureRequests)
    );
};
export const getAllUserFeatureRequests = async (req, res) => {
  await featureRequestModel
    .find({ creatorType: "user" })
    .then((allUserFeatureRequests) =>
      res.status(200).send(allUserFeatureRequests)
    );
};

export const updateFeatureRequest = async (req, res) => {
  if (req.body.featureRequest._id.length > 0) {
    featureRequestModel.findOneAndUpdate(
    { _id: req.body.featureRequest._id },
    {
      title: req.body.featureRequest.title,
      details: req.body.featureRequest.details,
      creatorType: req.body.featureRequest.creatorType,
      status: req.body.featureRequest.status,
      creator: req.body.featureRequest.creator,
    },
    {
      new: true,
    },
    function (err, upsertedFeatureRequest) {
      if (err) return res.status(500).send({ error: err });
      res.status(200).send(upsertedFeatureRequest);
    }
  );
  }
};

export const createFeatureRequest = async (req, res) => {
  const featureRequestData = req.body.featureRequest;

  const loggedUser = await userModel.findById('63a5c70dcd60d8df7aecc3f8');

  
  const newFeatureRequest = new featureRequestModel({
    title: featureRequestData.title,
    details: featureRequestData.details,
    creatorType: loggedUser.type,
    status: featureRequestData.status,
    creator: loggedUser._id,
  });

  newFeatureRequest
    .save()
    .then((featureRequest) => res.status(200).send(featureRequest))
    .catch((error) => console.log(error));
};

export const upVote = async (req, res) => {
  const updatedFeatureRequest = await featureRequestModel.updateOne(
    { _id: req.params.id },
    { $addToSet: { voters: req.body.userId } }
  );

  await userModel.updateOne(
    { _id: req.body.userId },
    { $addToSet: { voted: req.params.id } }
  );

  res.status(200).json({ updatedFeatureRequest });
};

export const downVote = async (req, res) => {
  const updatedFeatureRequest = await featureRequestModel.updateOne(
    { _id: req.params.id },
    { $pull: { voters: req.body.userId } }
  );

  await userModel.updateOne(
    { _id: req.body.userId },
    { $pull: { voted: req.params.id } }
  );

  res.status(200).json({ updatedFeatureRequest });
};

export const deleteFeatureRequest = async (req, res) => {
  const deleteFeature = await featureRequestModel.findOneAndDelete({ _id: req.body.featureRequestId });
  res.json({
    deleted: true,
  })
}

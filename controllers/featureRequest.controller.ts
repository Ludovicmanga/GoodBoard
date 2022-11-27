import featureRequestModel from "../models/featureRequest.model";
import mongoose from "mongoose";
import userModel from "../models/user.model";
import { request } from "express";

const ObjectId = mongoose.Types.ObjectId;

export const getAllFeatureRequests = async (req, res) => {
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

export const upsertFeatureRequest = async (req, res) => {
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
      upsert: true,
    },
    function (err, upsertedFeatureRequest) {
      if (err) return res.status(500).send({ error: err });
      res.status(200).send(upsertedFeatureRequest);
    }
  );
};

export const createFeatureRequest = (req, res) => {
  const newFeatureRequest = new featureRequestModel({
    title: req.body.title,
    details: req.body.details,
    creatorType: req.body.creatorType,
    status: req.body.status,
    creator: req.body.creator,
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

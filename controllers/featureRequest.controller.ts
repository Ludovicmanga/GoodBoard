import featureRequestModel from "../models/featureRequest.model";
import mongoose from "mongoose";
import userModel from "../models/user.model";
import { request } from "express";
import topicModel from "../models/topic.module";
import featureTopicRelModel from "../models/featureTopicRelModel";

export const getAllFeatureRequests = async (req, res) => {
  await featureRequestModel
    .find()
    .then((allFeatureRequests) => res.status(200).send(allFeatureRequests));
};

export const getAllBoardFeatureRequests = async (req, res) => {
  try {
    const features = await featureRequestModel.find({ board: req.body.boardId });

    const mapped = await Promise.all(
      features.map(async (feature) => {
        const featureRel = await featureTopicRelModel.find({ feature: feature._id });
        let topics = [];
        if (featureRel.length > 0) {
          topics = await topicModel.find({ _id: { $in: featureRel.map((feat) => feat.topic) } });
        }
        return {...feature.toObject(), topics: topics.map(top => top.title)};
      })
    );
    res.status(200).send(mapped);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
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
  try {
    const { title, details, creatorType, status, creator, topics } = req.body.featureRequest;
    if (req.body.featureRequest._id.length > 0) {
      const updated = await featureRequestModel.findOneAndUpdate(
        { _id: req.body.featureRequest._id },
        {
          title,
          details,
          creatorType,
          status,
          creator,
        },
        {
          new: true,
        }
      );
      if (updated) {
        if (topics.length > 0) {
          // Create an array to store the topic IDs
          const topicIds = [];

          // Iterate over each topic title in the 'topics' array
          for (const topicTitle of topics) {
            // Find or create a new topic based on the title
            const topic = await topicModel.findOneAndUpdate(
              { title: topicTitle },
              { title: topicTitle },
              { upsert: true, new: true }
            );

            // Push the topic ID to the array
            topicIds.push(topic._id);
          }

          // Update the feature-topic relationships
          await featureTopicRelModel.deleteMany({ feature: updated._id });
          await featureTopicRelModel.insertMany(
            topicIds.map((topicId) => ({ feature: updated._id, topic: topicId }))
          );
        }
        res.send(updated);
      }
    }
  } catch (e) {
    console.log(e, ' is the error');
  }
};

export const createFeatureRequest = async (req, res) => {
  const featureRequestData = req.body.featureRequest;

  const newFeatureRequest = new featureRequestModel({
    title: featureRequestData.title,
    details: featureRequestData.details,
    creatorType: req.user.type,
    status: featureRequestData.status,
    creator: req.user.id,
    board: req.body.board,
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
  await featureRequestModel.findOneAndDelete({
    _id: req.body.featureRequestId,
  });
  res.json({
    deleted: true,
  });
};

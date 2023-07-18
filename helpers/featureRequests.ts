import featureRequestModel from "../models/featureRequest.model";
import featureTopicRelModel from "../models/featureTopicRelModel";
import topicModel from "../models/topic.module";

export const getAllBoardFeatureRequestsHelper = async (boardId: string) => {
  return await featureRequestModel.find({ board: boardId });
};

export const getAllBoardFeatureRequestsMappedWithTopics = async (
  boardId: number
) => {
  const features = await featureRequestModel.find({
    board: boardId,
  });
  const mapped = await Promise.all(
    features.map(async (feature) => {
      const featureRel = await featureTopicRelModel.find({
        feature: feature._id,
      });
      let topics = [];
      if (featureRel.length > 0) {
        topics = await topicModel.find({
          _id: { $in: featureRel.map((feat) => feat.topic) },
        });
      }
      return {
        ...feature.toObject(),
        topics: topics.map((top) => top.title),
      };
    })
  );
  return mapped;
};

import featureRequestModel from "../models/featureRequest.model";
import featureTopicRelModel from "../models/featureTopicRelModel";
import topicModel from "../models/topic.model";
import userModel from "../models/user.model";

export const getAllBoardFeatureRequestsHelper = async (boardId: string) => {
  return await featureRequestModel.find({ board: boardId });
};

export const getAllBoardFeatureRequestsMappedWithTopics = async (
  boardId: number
) => {
  const features = await featureRequestModel.find({
    board: boardId,
  });

  const allFeatureRequestsVotersList = features
  .map((feature) => feature.voters)
  .flat();

// Create a Set from the allFeatureRequestsVotersList to remove duplicates
const uniqueVotersSet = new Set(allFeatureRequestsVotersList);

// Convert the Set back to an array to get the unique voters list
const uniqueVotersIdsList = Array.from(uniqueVotersSet);

const usersList = await userModel.find({
  _id: {
    $in: uniqueVotersIdsList,
  },
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
        votersPics: usersList.filter(user => feature.voters.includes(user.id )).map(user => user.picture)
      };
    })
  );
  return mapped;
};

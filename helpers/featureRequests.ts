import changeLogModel from "../models/changeLog.model";
import featureRequestModel from "../models/featureRequest.model";
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
      return {
        ...feature.toObject(),
        votersPics: usersList.filter(user => feature.voters.includes(user.id )).map(user => user.picture)
      };
    })
  );
  return mapped;
};

export const addToChangeLog = async (boardId: string, featureRequestId: string) => {
  try {
    const foundFeatureRequest = await featureRequestModel.findById(
      featureRequestId
    );
    if (foundFeatureRequest) {
      const newChangeLogItem = await changeLogModel.create({
        title: foundFeatureRequest.title,
        details: foundFeatureRequest.details,
        boardId,
      });
      if (newChangeLogItem) {
        return newChangeLogItem;
      }
    }
  } catch (e) {}
};

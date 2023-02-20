import featureRequestModel from "../models/featureRequest.model";

export const getAllBoardFeatureRequestsHelper = async (boardId: string) => {
  return await featureRequestModel.find({ board: boardId });
};

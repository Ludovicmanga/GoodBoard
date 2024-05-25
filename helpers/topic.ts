import { User } from "../client/src/helpers/types";
import featureRequestModel from "../models/featureRequest.model";
import topicModel from "../models/topic.model";
import { checkUserIsAdminOnThisBoard } from "./user";

export const createTopic = async (user: User, label: string, boardId: number) => {
    const userIsAdminOnThisBoard = await checkUserIsAdminOnThisBoard(user, boardId);
    if (userIsAdminOnThisBoard) {
        const createdTopic = await topicModel.create({ label, boardId });
        return createdTopic;
    } else {
        throw new Error('user doesnt have the right to create a topic');
    }
}

export const addTopicOnFeatureRequest = async (user: User, topicId: string, featureId: number, boardId: number) => {
    const userIsAdminOnThisBoard = await checkUserIsAdminOnThisBoard(user, boardId);

    if (userIsAdminOnThisBoard) {
        const addedTopic = await featureRequestModel.findOneAndUpdate({
            _id: featureId
        }, {
            $push: {
                topics: topicId
            }
        }, {
            new: true
        })
        return addedTopic;
    } else {
        throw new Error('user doesnt have the right to add a topic on feature');
    }
}
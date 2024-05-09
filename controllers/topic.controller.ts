import { addTopicOnFeatureRequest, createTopic } from "../helpers/topic";
import topicModel from "../models/topic.model";

export const create = async (req, res) => {
    try {
        const { label, boardId } = req.body;
        if (req.user  ) {
            const createdTopic = await createTopic(req.user, label, boardId);
            if (createdTopic) {
                res.send(createdTopic);
            }
        }
    } catch(e) {
        console.log(e, ' is the error');
    }
}

export const getAllFromBoard = async (req, res) => {
    try {
        if (req.user) {
            const { boardId } = req.body;
            const topicsList = await topicModel.find({
                boardId
            })
            res.send(topicsList);
        }
    } catch (e) {
        console.log(e, ' is the error');
    }
}

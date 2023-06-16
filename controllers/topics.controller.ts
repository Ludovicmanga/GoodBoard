import topicModel from "../models/topic.module"

export const getAllTopics = async (req, res) => {
    const topics = await topicModel.find();
    res.send(topics.map(topic => topic.title));
}
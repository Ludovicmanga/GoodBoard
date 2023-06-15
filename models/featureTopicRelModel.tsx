import mongoose from "mongoose";

const featureTopicRelSchema = new mongoose.Schema(
    {
        feature: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'feature'
        },
        topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'topic'
        },
    }
);

const featureTopicRelModel = mongoose.model("featureTopicRel", featureTopicRelSchema);

export default featureTopicRelModel;
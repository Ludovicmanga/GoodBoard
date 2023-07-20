import mongoose from "mongoose";
var featureTopicRelSchema = new mongoose.Schema({
    feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feature'
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic'
    }
});
var featureTopicRelModel = mongoose.model("featureTopicRel", featureTopicRelSchema);
export default featureTopicRelModel;

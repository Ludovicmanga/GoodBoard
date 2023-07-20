import mongoose from "mongoose";
var topicSchema = new mongoose.Schema({
    title: {
        type: String,
        max: 1024
    }
});
var topicModel = mongoose.model("topic", topicSchema);
export default topicModel;

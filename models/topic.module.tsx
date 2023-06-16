import mongoose from "mongoose";
export {};

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    max: 1024,
  },
});

const topicModel = mongoose.model("Topic", topicSchema);

export default topicModel;

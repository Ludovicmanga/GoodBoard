import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      max: 1024,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
    },
  },
  {
    timestamps: true,
  }
);

topicSchema.index({ label: 1, boardId: 1 }, { unique: true });

const topicModel = mongoose.model("topic", topicSchema);

export default topicModel;

import mongoose from "mongoose";

const changeLogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      max: 1024,
    },
    details: {
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

const changeLogModel = mongoose.model("changeLog", changeLogSchema);

export default changeLogModel;

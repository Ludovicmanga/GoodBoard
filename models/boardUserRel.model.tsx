import mongoose from "mongoose";

const boardUserRelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
  },
  userRole: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
});

boardUserRelSchema.index({ user: 1, board: 1 }, { unique: true });

const boardUserRelModel = mongoose.model("boardUserRel", boardUserRelSchema);

export default boardUserRelModel;

import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        }
    }
);

const boardModel = mongoose.model("board", boardSchema);

export default boardModel;
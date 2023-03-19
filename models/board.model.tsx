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
        },
        privateUrl: {
            type: String,
            required: false,
            lowercase: true,
            unique: true,
            trim: true,
        },
        publicUrl: {
            type: String,
            required: false,
            lowercase: true,
            unique: true,
            trim: true,
        },
        picture: {
            type: String,
            required: false,
            max: 1024
        },
        themeColor: {
            type: String,
            required: true,
            max: 1024
        },
    }
);

const boardModel = mongoose.model("board", boardSchema);

export default boardModel;
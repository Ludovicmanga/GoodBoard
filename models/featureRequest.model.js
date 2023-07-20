import mongoose from "mongoose";
var featureRequestSchema = new mongoose.Schema({
    title: {
        type: String,
        max: 1024
    },
    details: {
        type: String,
        max: 1024
    },
    voters: {
        type: [String]
    },
    creatorType: {
        type: String,
        max: 1024
    },
    status: {
        type: String,
        max: 1024
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'board'
    }
}, {
    timestamps: true
});
var featureRequestModel = mongoose.model("feature", featureRequestSchema);
export default featureRequestModel;

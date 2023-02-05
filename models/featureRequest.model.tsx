import mongoose from "mongoose";
export {};

const featureRequestSchema = new mongoose.Schema(
{
    title :{
        type: String,
        max: 1024
    },
    details :{
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
    },
},
  {
    timestamps: true,
  }

)

const featureRequestModel = mongoose.model("Feature Request", featureRequestSchema);

export default featureRequestModel;
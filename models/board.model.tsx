import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
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
  url: {
    type: String,
    required: false,
    lowercase: true,
    unique: true,
    trim: true,
  },
  websiteUrl: {
    type: String,
    required: false,
    lowercase: true,
    unique: false,
    trim: true,
  },
  instagramUrl: {
    type: String,
    required: false,
    lowercase: true,
    unique: false,
    trim: true,
  },
  twitterUrl: {
    type: String,
    required: false,
    lowercase: true,
    unique: false,
    trim: true,
  },
  facebookUrl: {
    type: String,
    required: false,
    lowercase: true,
    unique: false,
    trim: true,
  },
  billingPlan: {
    type: String,
    required: true,
    lowercase: true,
    unique: false,
    trim: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  picture: {
    type: String,
    required: false,
    max: 1024,
  },
  themeColor: {
    type: String,
    required: true,
    max: 1024,
  },
});

const boardModel = mongoose.model("board", boardSchema);

export default boardModel;

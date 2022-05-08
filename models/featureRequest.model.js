"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
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
        type: String,
        max: 1024
    }
}, {
    timestamps: true
});
var featureRequestModel = mongoose.model("Feature Request", featureRequestSchema);
module.exports = featureRequestModel;

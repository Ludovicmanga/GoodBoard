import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export var DBConnection = mongoose
    .connect(process.env.MONGODB_URL || '')
    .then(function () {
    console.log('connected to MongoDB !!');
})["catch"](function (error) { return console.log('Failed to connect to MongoDB', error); });

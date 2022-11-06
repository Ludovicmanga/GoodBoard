import mongoose from "mongoose";

export const DBConnection = mongoose
    .connect(`mongodb+srv://ludovicmangaj:M433c'm442B@cluster0.fhytx.mongodb.net/goodboard`)
    .then( () => {
        console.log('connected to MongoDB !!')
    })
    .catch( error => console.log('Failed to connect to MongoDB', error) );
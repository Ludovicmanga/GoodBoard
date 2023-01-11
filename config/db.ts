import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const DBConnection = mongoose
    .connect(process.env.MONGODB_URL || '')
    .then( () => {
        console.log('connected to MongoDB !!')
    })
    .catch( error => console.log('Failed to connect to MongoDB', error) );
const mongoose = require("mongoose");

mongoose
    .connect(`mongodb+srv://ludovicmangaj:${process.env.DB_USER_PASSWORD}@cluster0.fhytx.mongodb.net/goodboard`)
    .then( () => {
        console.log('connected to MongoDB !!')
    })
    .catch( error => console.log('Failed to connect to MongoDB', error) );
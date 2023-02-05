import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        type: {
            type: String,
            required: true,
            max: 1024
        },
        voted: {
            type: [String],
            default: [],
        },
    }
);

userSchema.pre("save", async function(this, next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
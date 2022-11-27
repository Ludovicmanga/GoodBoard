import mongoose from "mongoose";
/* import { isEmail } from 'validator';
 */import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
/*             validate: [isEmail],
 */            lowercase: true,
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
            type: [String]
        }
    }
);

userSchema.pre("save", async function(this, next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/* export const login = async function(this: typeof userSchema, email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
  };
 */
const userModel = mongoose.model("user", userSchema);

export default userModel;
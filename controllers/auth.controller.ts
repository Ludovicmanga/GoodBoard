import userModel from "../models/user.model";
import { signUpErrors } from '../utils/errors.utils';

const maxAge = 3 * 24 * 60 * 1000;

export const signUp = (req, res) => {
    const { email, password, type} = req.body;
    const user = new userModel({email, password, type});

    user.save()
        .then(user => res.status(201).json({ user: user._id }))
        .catch (error => {
            console.log('didnt work because ', error);
            const formattedErrors = signUpErrors(error);
            res.status(200).json( error );
        })
}

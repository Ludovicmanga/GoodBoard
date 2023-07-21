import userModel from "../models/user.model";
import { signUpErrors } from "../utils/errors.utils";
import jwtDecode from 'jwt-decode';
const maxAge = 3 * 24 * 60 * 1000;

export const signUp = (req, res) => {
  const { email, password } = req.body;
  const user = new userModel({ email, password });

  user
    .save()
    .then((user) => res.status(201).json({ user: user._id }))
    .catch((error) => {
      console.log("didnt work because ", error);
      const formattedErrors = signUpErrors(error);
      res.status(200).json(error);
    });
};

export const loginOrSignupGoogle = async (req, res) => {
  try {
    const infos: {
      hd?: string;
      email: string;
      name: string;
      given_name: string;
      family_name: string;
      sub: string;
      picture: string;
      id: string;
    } = jwtDecode(req.body.credentialResponse.credential);

    const foundUser = await userModel.findOne({
      email: infos.email,
    });

    const logUserIn = () => {
      req.login(foundUser, async err => {
        if (err) {
          console.log(err, ' is the err');
        } else {
          res.json({ user: foundUser });
        }
      });
    }

    if (foundUser) {
      logUserIn();
    } else {
      const createdUser = await userModel.create({
        email: infos.email,
        password: req.body.credentialResponse.credential,
        picture: infos.picture,
      });
      if (createdUser) {
        logUserIn();
      }
    }

  } catch (e) {

  }
}
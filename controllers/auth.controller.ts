import { UserType } from "../client/src/helpers/types";
import { getUserRoleOnThisBoard, sendWelcomeMessage } from "../helpers/user";
import userModel from "../models/user.model";
import { signUpErrors } from "../utils/errors.utils";
import jwtDecode from 'jwt-decode';

export const signUp = (req, res) => {
  const { email, password } = req.body;
  const user = new userModel({ email, password });

  user
    .save()
    .then((user) => {
      sendWelcomeMessage(user.email, user.given_name || '')
      res.status(201).json({ user: user._id });
    })
    .catch((error) => {
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

    let userToSignUpOrLogin;
    let roleOnThisBoard: UserType | undefined;

    if (foundUser) {
      userToSignUpOrLogin = foundUser;
    } else {
      const user = new userModel({
        email: infos.email,
        password: req.body.credentialResponse.credential,
        picture: infos.picture,
        given_name: infos.given_name,
        family_name: infos.family_name
      });

      const createdUser = await user.save();

      if (createdUser) {
        userToSignUpOrLogin = createdUser;
        sendWelcomeMessage(createdUser.email, createdUser.given_name || '')
      }
    }
    if (userToSignUpOrLogin) {
      if (req.body.boardId) {
        roleOnThisBoard = await getUserRoleOnThisBoard(userToSignUpOrLogin, req.body.boardId);
      }

      req.login(userToSignUpOrLogin, async (err) => {
        if (err) {
          console.log(err, " is the err");
        } else {
          res.json({ user: { ...userToSignUpOrLogin._doc, roleOnThisBoard } });
        }
      });
    }

  } catch (e) {

  }
}
import userModel from '../models/user.model';

export const getUser = async (req, res, next) => {
   console.log('Heyy oui connecteyy', req.user)
   const user = await userModel.findById(req.user.id);
   req.login(user, err => {
        if (err) {
          next(err);
        } else {
          res.json({ user });
        }
      });
}
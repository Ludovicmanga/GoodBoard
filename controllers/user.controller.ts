import userModel from '../models/user.model';

export const getUser = async (req, res, next) => {
   const user = await userModel.findById(req.params.id);
   if (user) {
    res.send(user)
   }
}
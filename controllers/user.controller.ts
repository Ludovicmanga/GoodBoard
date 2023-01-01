import userModel from '../models/user.model';

export const getUser = async (req, res, next) => {
   if (req.user) {
      const user = await userModel.findById(req.user.id);
      if (user) {
         res.send({
            user
         })
      }
   } else {
      res.send({
         notAuthenticated: true,
      })
   }
}
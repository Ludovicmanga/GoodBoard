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

export const updateEmail = async (req, res) => {
   if (req.user) {
      const updatedUser = await userModel.findOneAndUpdate({ _id: req.user.id }, { email: req.body.updatedEmail }, { new: true });
      if (updatedUser) {
         res.status(200).json({
            updatedEmail: updatedUser.email,
         })
      }
   }
}
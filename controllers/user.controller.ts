import userModel from '../models/user.model';

export const getUser = (req, res) => {
   console.log('Heyy oui connecteyy', req.user)
   userModel.findById(req.params.id).select('-password')
        .then(user => res.status(200).send(user))
        .catch(error => res.status(200).send(error))
}
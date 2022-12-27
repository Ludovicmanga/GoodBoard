import express from 'express';
import passport from 'passport';
import { signUp } from '../controllers/auth.controller';
import { getUser } from '../controllers/user.controller';

const router = express();

router.get('/get/:id', getUser);
router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('logged in');
});
router.post('/logout', (req: any, res) => {
    console.log('I will logout')
    req.logout();
});
router.post('/sign-up', signUp);

export default router;
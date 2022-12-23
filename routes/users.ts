import express from 'express';
import passport from 'passport';
import { signUp } from '../controllers/auth.controller';
import { getUser } from '../controllers/user.controller';

const router = express();

router.post('/login', passport.authenticate('local'), getUser);
router.post('/logout', (req: any, res) => {
    console.log('I will logout')
    req.logout();
});
router.post('/sign-up', signUp);

export default router;
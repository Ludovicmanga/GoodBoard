import express from 'express';
import passport from 'passport';
import { getUser } from '../controllers/user.controller';

const router = express();

router.post('/login', passport.authenticate('local'), getUser);

export default router;
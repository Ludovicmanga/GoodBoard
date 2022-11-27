import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import userModel from '../models/user.model';

const customFields = {
    usernameFiels: 'email',
}

passport.use(
    new LocalStrategy(
        async function verify(email, password, done) {
            try {
                const user = await userModel.findOne({ email });
                if (user) {
                const auth = await bcrypt.compare(password, user.password);
                if (auth) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, false, { message: 'Incorrect email.' });
            } catch (e) {
                return done(e);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try {
        const user = userModel.findOne({ id });
        if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (e) {
        return done(e, null);
      }
})

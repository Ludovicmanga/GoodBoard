import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import userModel from '../models/user.model';

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

passport.use(
    new LocalStrategy(
        customFields,
        async (email, password, done) => {
            try {
                console.log('I will try to verify')
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

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        console.log(user, ' is the user deserialized')
        if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (e) {
        return done(e, null);
      }
})

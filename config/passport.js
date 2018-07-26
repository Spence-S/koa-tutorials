const passport = require('koa-passport');
const { userModel: User } = require('../modules/user');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            email
          }
        });
        // no user was found
        if (!user) {
          done(null, false, { message: 'Incorrect username.' });
        }
        //user found check password is correct
        if (!(await user.isValidPw(password))) {
          // password incorrect
          done(null, false, { message: 'shiity password' });
        }
        // everything is good!
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser(async function(email, done) {
  try {
    const user = await User.findOne({ where: { email } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

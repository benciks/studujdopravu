const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const db = require('../app/models/userModel');

module.exports = function initialize(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });
  passport.deserializeUser( async (id, done) => {
    const result = await db.getUserById(id);
    done(null, result[0]);
  });

  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const result = await db.getUserByEmail(username);

        if (!result.length) {
          return done(null, false, {message: 'Nesprávny email'});
        }
        if (await bcrypt.compare(password, result[0].password)) {
          return done(null, result[0]);
        } else {
          return done(null, false, {message: 'Nesprávne heslo'});
        }
      } catch (err) {
        done(null, err);
      }
    })
  );
}


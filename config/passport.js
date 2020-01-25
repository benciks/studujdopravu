const LocalStrategy = require('passport-local').Strategy
const argon2 = require('argon2');
const db = require('../app/models/authModel');

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
          return done(null, false, {message: 'Incorrect user'});
        }
        if (await argon2.verify(result[0].password, password)) {
          return done(null, result[0]);
        } else {
          return done(null, false, {message: 'Incorrect password'});
        }
      } catch (err) {
        done(null, err);
      }
    })
  );
}


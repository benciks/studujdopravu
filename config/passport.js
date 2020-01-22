const LocalStrategy = require('passport-local').Strategy
const argon2 = require('argon2');
const mysql = require('./drivers/mysql');
const config = require('./db');
const db = mysql(config.development);

module.exports = function initialize(passport) {
  passport.serializeUser((user,done) => {
    done(null, user);
  });
  passport.deserializeUser( async (id, done) => {
    const result = await db.query("SELECT * FROM users WHERE id = ?",[id]);
    done(err, result[0]);
  });

  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'passoword'
    },
    async function (username, password, done) {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = ?",[username]);
        console.log(await !argon2.verify(result[0].password, password));
        if (!result.length) {
          return done(null, false, {msg: 'No user found'});
        }
        if (await argon2.verify(result[0].password, password)) {
          return done(null, result[0]);
        } else {
          return done(null, false, console.log("Wrong password"));
        }
      } catch(err) {
        done(null, err);
      }
    })
  );
}


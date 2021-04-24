var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var User = require('./schemas/user');
const USERSTATES = require('./constants/userState');

passport.use('admin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done){
  User.findOne({ username : username},function(err,user){
    return err
      ? done(err)
      : user
        ? password === user.password
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password.' })
        : done(null, false, { message: 'Incorrect username.' });
  });
}));

passport.use('user', new LocalStrategy({
  usernameField: 'id',
  passwordField: 'id'
}, function(username, password, done){
  User.findOne({ _id : username, state: {$ne: USERSTATES.ADMIN}}, function(err,user){
    return err ? done(err) : done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
      err
        ? done(err)
        : done(null,user);
    });
  });

  module.exports = passport;

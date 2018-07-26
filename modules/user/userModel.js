const { sequelize, db } = require('../../db');

const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const { blue, red } = require('chalk');

const User = sequelize.define('user', {
  firstName: {
    type: db.STRING
  },
  lastName: {
    type: db.STRING
  },
  email: {
    type: db.STRING,
    isEmail: true,
    unique: true
  },
  password: {
    type: db.STRING
  },
  salt: {
    type: db.STRING
  }
});

/**
 * remove password and salt from responses
 */
User.prototype.toJSON = function() {
  const { password, salt, ...rest } = this.get();
  return rest;
};

/**
 * sequelize hooks should return promises for async actions
 * http://docs.sequelizejs.com/manual/tutorial/hooks.html#declaring-hooks
 */
User.beforeCreate((user, options) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) reject(err);
        user.salt = salt;
        user.password = hash;
        resolve();
      });
    });
  });
});

/**
 * @param {string} pw - password to compare to password hash in db
 */
User.prototype.isValidPw = function(pw) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pw, this.password, function(err, res) {
      resolve(res);
    });
  });
};

User.sync()
  .then(() => {
    //console.log(blue("\nUser's table has synced successfully"));
  })
  .catch(err => console.log(red(err)));

module.exports = User;

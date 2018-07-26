const User = require('./userModel');
const passport = require('koa-passport');

const getUsers = async function getUsers(ctx, next) {
  try {
    const user = await User.findOne({ where: { firstName: 'John' } });
    ctx.body = {
      user,
      message: 'yo'
    };
  } catch (err) {
    await next(err);
  }
};

const getMe = async function getMe(ctx) {
  ctx.body = {
    name: 'spencer'
  };
};

const loginUser = async function(ctx) {
  return passport.authenticate('local', (err, user, info, status) => {
    if (!user.id) {
      ctx.body = { success: false };
    } else {
      ctx.body = {
        success: true,
        user
      };
      return ctx.login(user);
    }
  })(ctx);
};

module.exports = {
  getMe,
  getUsers,
  loginUser
};

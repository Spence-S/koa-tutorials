const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const Router = require('koa-router');
const session = require('koa-session');
const passport = require('./config/passport');
const { userRoutes } = require('./modules/user');

const app = new Koa();
const router = new Router();

// middlewares
app.use(bodyparser());
app.use(logger());

app.keys = ['secret'];
app.use(session({}, app));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(userRoutes.routes());

module.exports = app.listen(process.env.PORT || 3000, () => {
  console.log(`NODE_ENV===${process.env.NODE_ENV}`);
  console.log(`App listening on ${process.env.PORT || 3000}`);
});

const Router = require('koa-router');
const routes = require('./userControllers');

const router = new Router();

router.get('/users', routes.getUsers);

router.get('/users/me', routes.getMe);

router.post('/users/login', routes.loginUser);

module.exports = router;

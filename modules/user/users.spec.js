process.env.NODE_ENV = 'testing';
const Koa = require('koa');
const test = require('ava');

const app = require('../../index');
const request = require('supertest')(app);

test('GET /users', async t => {
  t.plan(2);

  const res = await request.get('/users');

  t.is(res.status, 200);
  t.is(res.body.message, 'yo');
});

test('POST /users/me', async t => {
  t.plan(2);

  const res = await request.get('/users/me');

  t.is(res.status, 200);
  t.is(res.body.name, 'spencer');
});

test('POST /users/login', async t => {
  t.plan(2);

  const res = await request.post('/users/login').send({
    email: 'john@1234.com',
    password: 'password'
  });

  t.is(res.status, 200);
  t.is(res.body.success, true);
});

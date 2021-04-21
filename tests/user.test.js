const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
  _id: userOneId,
  name: 'dugma user',
  email: 'samplemail233@hotmail.com',
  password: 'dugma123!',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test('should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'royke',
      email: 'nevoroy@gmail.com',
      password: 'raya1984$',
    })
    .expect(201)

  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  expect(response.body).toMatchObject({
    user: {
      name: 'royke',
      email: 'nevoroy@gmail.com',
    },
    token: user.tokens[0].token,
  })
  expect(user.password).not.toBe('raya1984$')
})

test('should log in existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)
  const user = await User.findById(userOneId)
  expect(user.tokens[1].token).toBe(response.body.token)
})

test('should not login non existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'nouser@gmail.com',
      password: 'basPass123#',
    })
    .expect(400)
})

test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not get profile for non autheticated user', async () => {
  await request(app).get('/users/me').send().expect(401)
})

test('should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('should not delete account for unauthenticated user', async () => {
  await request(app).delete('/users/me').send().expect(401)
})

test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)
  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'moshe kachlon',
    })
    .expect(200)
  const user = await User.findById(userOneId)
  expect(user.name).toEqual('moshe kachlon')
})

test('should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'zichron',
    })
    .expect(400)
})

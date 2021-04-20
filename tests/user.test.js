const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
  name: 'dugma user',
  email: 'samplemail233@hotmail.com',
  password: 'dugma123!',
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

test('should signup a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'royke',
      email: 'zohar4rh@gmail.com',
      password: 'raya1984$',
    })
    .expect(201)
})

test('should log in existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)
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

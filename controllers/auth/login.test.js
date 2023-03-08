// const login = require('./login');
// const { User } = require('../../models');
// const bcrypt = require('bcryptjs');

// describe('login controller test', () => {
//   it('should return user data with two fields email and subscription', async (done) => {
//     const mEmail = 'test@test.com';
//     const mPassword = 'password';
//     const mAvatarURL = 'https://test/image.jpg'

//     // create a new user with the provided email and password
//     const user = new User({
//       email: mEmail,
//       password: bcrypt.hashSync(mPassword, bcrypt.genSaltSync(10)), // hash the password for storage
//       avatarURL: mAvatarURL,
//     });
//     await user.save(); // save the user to the database

//     // mock the User.findOne function to return the created user
//     jest.spyOn(User, 'findOne').mockResolvedValue(user);

//     // make the request with the correct email and password
//     const req = {
//       body: {
//         email: mEmail,
//         password: mPassword,
//       },
//     };
//     const res = {
//       json: jest.fn(),
//     };
//     // await login(req, res);

//     // assert that the response has the expected properties
//     login(req, res)
//     .then(() => {
//       expect(res.status).toBe(200);
//       expect(res.body.token).toBeDefined();
//       expect(typeof res.body.user.email).toBe('string');
//       expect(typeof res.body.user.subscription).toBe('string');
//       done(); // call done to signal the end of the test
//     })
//     .catch(done); // call done with an error to signal a test failure
//   });
// });

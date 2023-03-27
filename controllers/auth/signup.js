const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const { Conflict } = require('http-errors');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password, subscription = 'starter' } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in use');
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = signup;

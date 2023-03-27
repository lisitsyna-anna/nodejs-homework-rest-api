const { User } = require('../../models');
const { NotFound, BadRequest } = require('http-errors');
const { sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound('User nor found');
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;

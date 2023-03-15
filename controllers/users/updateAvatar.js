const path = require('path');
const fs = require('fs/promises');
const { BadRequest, NotAcceptable } = require('http-errors');
const Jimp = require('jimp');
const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw new BadRequest('Please upload an avatar');
  }

  const { path: tempUpload, originalname, mimetype } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;

  if (mimetype !== 'image/jpeg') {
    await fs.unlink(tempUpload);
    throw new NotAcceptable('Please select an image with extension ".jpeg" or ".jpg"');
  }

  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    Jimp.read(tempUpload, (err, avatar) => {
      if (err) {
        throw err;
      }
      avatar.resize(250, 250).quality(60).write(resultUpload);
    });

    const avatarURL = path.join('avatars', avatarName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;

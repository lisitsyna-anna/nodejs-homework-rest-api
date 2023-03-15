const express = require('express');

const { users: controllers } = require('../../controllers');
const { auth, validation, ctrlWrapper, upload } = require('../../middlewares');
const { subscriptionJoiSchema } = require('../../models/user');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(controllers.getCurrentUser));

router.patch(
  '/',
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(controllers.updateSubscription)
);

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(controllers.updateAvatar));

module.exports = router;

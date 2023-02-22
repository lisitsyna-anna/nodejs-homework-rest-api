const express = require('express');

const { auth: controllers } = require('../../controllers');
const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { userJoiSchema, subscriptionJoiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(userJoiSchema), ctrlWrapper(controllers.signup));

router.post('/login', validation(userJoiSchema), ctrlWrapper(controllers.login));

router.get('/logout', auth, ctrlWrapper(controllers.logout));

router.get('/current', auth, ctrlWrapper(controllers.getCurrentUser));

router.patch(
  '/',
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(controllers.updateSubscription)
);

module.exports = router;

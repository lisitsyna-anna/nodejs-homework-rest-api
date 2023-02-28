const express = require('express');

const { contacts: controllers } = require('../../controllers');
const { contactJoiSchema, statusJoiSchema } = require('../../models/contact');
const { auth, validation, ctrlWrapper } = require('../../middlewares');

const router = express.Router();

router.get('/', auth, ctrlWrapper(controllers.getAll));

router.get('/:contactId', auth, ctrlWrapper(controllers.getById));

router.post('/', auth, validation(contactJoiSchema), ctrlWrapper(controllers.add));

router.put('/:contactId', auth, validation(contactJoiSchema), ctrlWrapper(controllers.updateById));

router.patch(
  '/:contactId/favorite',
  auth,
  validation(statusJoiSchema),
  ctrlWrapper(controllers.updateStatusContact)
);

router.delete('/:contactId', auth, ctrlWrapper(controllers.removeById));

module.exports = router;

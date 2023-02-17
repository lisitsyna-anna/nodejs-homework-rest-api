const express = require('express');

const { contacts: controllers } = require('../../controllers');
const { contactJoiSchema, statusJoiSchema } = require('../../models/contact');
const { validation } = require('../../middlewares');

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:contactId', controllers.getById);

router.post('/', validation(contactJoiSchema), controllers.add);

router.put('/:contactId', validation(contactJoiSchema), controllers.updateById);

router.patch('/:contactId/favorite', validation(statusJoiSchema), controllers.updateStatusContact);

router.delete('/:contactId', controllers.removeById);

module.exports = router;

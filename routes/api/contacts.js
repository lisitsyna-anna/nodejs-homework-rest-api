const express = require('express');

const { contacts: controllers } = require('../../controllers');
const { contactSchema } = require('../../schemas');
const { validation } = require('../../middlewares');

const validationMiddlevare = validation(contactSchema);

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:contactId', controllers.getById);

router.post('/', validationMiddlevare, controllers.add);

router.delete('/:contactId', controllers.removeById);

router.put('/:contactId', validationMiddlevare, controllers.updateById);

module.exports = router;

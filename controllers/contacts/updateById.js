const { NotFound } = require('http-errors');
const contactsOperations = require('../../models/contacts');

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: 'succes',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;

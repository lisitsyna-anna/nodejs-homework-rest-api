const { NotFound } = require('http-errors');
const contactsOperations = require('../../models/contacts');

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: 'succes',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
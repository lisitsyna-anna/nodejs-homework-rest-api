const { Contact } = require('../../models');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;

  const skip = (page - 1) * limit;

  let contacts;
  if (favorite) {
    contacts = await Contact.find({ owner: _id, favorite }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id email subscription');
  } else {
    contacts = await Contact.find({ owner: _id }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id email subscription');
  }

  res.json({
    status: 'succes',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;

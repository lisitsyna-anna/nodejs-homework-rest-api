const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('../users/getCurrentUser');
const updateSubscription = require('../users/updateSubscription');
const updateAvatar = require('../users/updateAvatar');

module.exports = {
  signup,
  login,
  getCurrentUser,
  logout,
  updateSubscription,
  updateAvatar,
};

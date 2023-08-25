const { ctrlWrapper } = require("../../helpers/index");

const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscribe = require("./updateSubscribe");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscribe: ctrlWrapper(updateSubscribe),
};

const { Contact } = require("../../models/contact");
const { httpError } = require("../../helpers/index");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw httpError(404, "Not found contact");
  }
  res.status(200).json({ status: "success", code: 200, data: { result } });
};

module.exports = removeContact;

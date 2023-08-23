const { Contact } = require("../../models/contact");
const httpError = require("../../helpers/httpError");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw httpError(404, "Not found contact");
  }
  res.json({ status: "success", code: 200, data: { result: contact } });
};

module.exports = getContactById;

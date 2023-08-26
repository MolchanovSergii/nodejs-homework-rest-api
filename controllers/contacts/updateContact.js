const { Contact, schemas } = require("../../models/contact");
const { httpError } = require("../../helpers/index");

const updateContact = async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not found contact");
  }
  res.status(200).json({ status: "success", code: 200, data: { result } });
};

module.exports = updateContact;

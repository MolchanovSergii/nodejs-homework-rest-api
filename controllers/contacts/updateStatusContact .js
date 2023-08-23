const { Contact, schemas } = require("../../models/contact");
const httpError = require("../../helpers/httpError");

const updateStatusContact = async (req, res, next) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    if (error.details[0].message === '"favorite" is required') {
      error.message = "missing field favorite";
    }
    error.status = 400;
    throw error;
  }

  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json({ status: "success", code: 200, data: { result } });
};

module.exports = updateStatusContact;

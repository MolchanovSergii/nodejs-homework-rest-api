const { Contact, schemas } = require("../../models/contact");

const addContact = async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);

  if (error) {
    error.status = 400;
    throw error;
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json({ status: "success", code: 201, data: { result } });
};

module.exports = addContact;

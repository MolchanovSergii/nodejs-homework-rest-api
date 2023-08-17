// const contactsOperations = require("../../models/contacts");
const Contact = require("../../models/contact");
// const contactSchema = require("../../shemas/contacts");

const addContact = async (req, res, next) => {
  try {
    // const { error } = contactSchema.validate(req.body);

    // if (error) {
    //   error.status = 400;
    //   throw error;
    // }
    const result = await Contact.create(req.body);
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;

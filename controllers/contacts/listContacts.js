const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json({
    status: "success",
    code: 200,
    data: { result: contacts },
  });
};

module.exports = listContacts;

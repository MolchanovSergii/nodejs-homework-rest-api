const express = require("express");

const { contacts: controller } = require("../../controllers/index");
const { isValidId, authenticate } = require("../../middlewares/index");

const router = express.Router();

router.get("/", authenticate, controller.listContacts);

router.get("/:contactId", authenticate, isValidId, controller.getContactById);

router.post("/", authenticate, controller.addContact);

router.delete("/:contactId", authenticate, isValidId, controller.removeContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  controller.updateStatusContact
);

router.put("/:contactId", authenticate, isValidId, controller.updateContact);

module.exports = router;

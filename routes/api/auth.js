const express = require("express");

const {
  validateBody,
  authenticate,
  upload,
} = require("../../middlewares/index");
const { schemas } = require("../../models/user");

const { auth: controller } = require("../../controllers/index");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  controller.register
);

router.post(
  "/users/login",
  validateBody(schemas.loginSchema),
  controller.login
);

router.get("/users/current", authenticate, controller.getCurrent);

router.post("/users/logout", authenticate, controller.logout);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.updateSubscribeSchema),
  controller.updateSubscribe
);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  controller.updateAvatar
);

module.exports = router;

const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handlerSchemaValidationErrors } = require("../helpers/index");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const roleList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: roleList,
      default: "starter",
    },
    token: { type: String, default: "" },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  password: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid(...roleList),
});

const loginSchema = Joi.object({
  password: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  token: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateSubscribeSchema = Joi.object({
  subscription: Joi.string()
    .valid(...roleList)
    .required()
    .messages({
      "any.only":
        "Subscription must be one of the following: starter, pro, business",
    }),
});

userSchema.post("save", handlerSchemaValidationErrors);

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscribeSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};

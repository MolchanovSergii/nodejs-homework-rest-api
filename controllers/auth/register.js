const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { httpError, sendEmail } = require("../../helpers/index");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click here for verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    status: "201 Created",
    ResponseBody: {
      user: { email: newUser.email, subscription: newUser.subscription },
    },
  });
};

module.exports = register;

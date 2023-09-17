const { httpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw httpError(400, "missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email not found");
  }

  if (user.verify) {
    throw httpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click here for verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    ResponseBody: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendVerifyEmail;

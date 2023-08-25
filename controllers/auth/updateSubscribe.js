const { User } = require("../../models/user");
const { httpError } = require("../../helpers/index");

const updateSubscribe = async (req, res) => {
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { subscription },
    { new: true }
  );

  if (!user) {
    throw httpError(404, "User not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: { subscription: user.subscription },
  });
};

module.exports = updateSubscribe;

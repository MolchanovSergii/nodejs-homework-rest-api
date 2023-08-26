const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    ResponseBody: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");
const { httpError } = require("../../helpers");

const avatarsDirectory = path.join(
  __dirname,
  "../",
  "../",
  "public",
  "avatars"
);

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw httpError(400, "Bad request");
  }

  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;

  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250).writeAsync(tempUpload);

  const resultUpload = path.join(avatarsDirectory, fileName);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    ResponseBody: {
      avatarURL,
    },
  });
};

module.exports = updateAvatar;

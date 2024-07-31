const accountModel = require("./models/Account.js");

module.exports.DatabaseAddFeedback = async (username, feedback) => {
  const dbAccount = await accountModel.findOne({
    ["account.username"]: username,
  });

  dbAccount.feedback.push({
    username: username,
    description: feedback,
  });

  await dbAccount.save();
};

module.exports.DatabaseGetFeedbacks = async (username) => {
  const dbAccount = await accountModel.findOne({
    ["account.username"]: username,
  });

  return dbAccount.feedback;
};

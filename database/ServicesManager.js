const accountModel = require("./models/Account.js");

const engineers = [
  "Hazin Ahmad",
  "Vinay Chandran",
  "Chirag Patel",
  "Pual Thoma",
];

module.exports.DatabaseAddService = async (username, description) => {
  const dbAccount = await accountModel.findOne({
    ["account.username"]: username,
  });

  dbAccount.services.push({
    engineer: engineers[Math.floor(Math.random() * engineers.length)],
    description: description,
  });

  await dbAccount.save();
};

module.exports.DatabaseGetService = async (username) => {
  const dbAccount = await accountModel.findOne({
    ["account.username"]: username,
  });

  return dbAccount.services.length === 0
    ? "NONE"
    : dbAccount.services[dbAccount.services.length - 1];
};

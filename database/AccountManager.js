const accountModel = require("./models/Account.js");

module.exports.DatabaseCreateAccount = async (credentials, request) => {
  const createdAccount = new accountModel({
    account: {
      ...credentials,
    },
  });

  request.session.username = createdAccount.account.username;
  await createdAccount.save();
};

module.exports.DatabaseLoginAccount = async (credentials, request) => {
  const dbAccount = await accountModel.findOne({
    ["account.username"]: credentials.username,
  });

  if (dbAccount === null) {
    console.log("ACCOUNT DOES NOT EXIST");
    return false;
  }

  if (dbAccount.account.password !== credentials.password) {
    console.log("INVALID PASSWORD");
    return false;
  }

  request.session.username = dbAccount.account.username;
  return true;
};

const { connect } = require("mongoose");

const connectDatabase = async () => {
  await connect(
    "mongodb+srv://chirag:chirag@accounts.wlveej7.mongodb.net/?retryWrites=true&w=majority&appName=Accounts",
    {
      retryWrites: true,
      retryReads: true,
    }
  );
};

module.exports = connectDatabase;

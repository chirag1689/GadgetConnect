const engineerModel = require("./models/Engineer.js");

module.exports.DatabaseGetRatings = async () => await engineerModel.find();

module.exports.DatabaseRateEngineer = async (name, rating) => {
  const selectedEngineer = await engineerModel.findOne({ name: name });

  ++selectedEngineer.count;
  selectedEngineer.rating =
    (selectedEngineer.rating + parseInt(rating)) / selectedEngineer.count;

  selectedEngineer.rating = selectedEngineer.rating.toPrecision(3);
  await selectedEngineer.save();
};

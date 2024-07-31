const { Schema, SchemaTypes, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  username: {
    type: SchemaTypes.String,
    required: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
  },
});

const servicesSchema = new Schema({
  engineer: {
    type: SchemaTypes.String,
    required: true,
  },
  description: {
    type: SchemaTypes.String,
    required: true,
  },
});

const feedbackSchema = new Schema({
  username: {
    type: SchemaTypes.String,
    required: true,
  },
  description: {
    type: SchemaTypes.String,
    required: true,
  },
});

const accountSchema = new Schema({
  account: {
    _id: false,
    type: userSchema,
    required: true,
  },
  services: {
    _id: false,
    type: [servicesSchema],
    requried: true,
  },
  feedback: {
    _id: false,
    type: [feedbackSchema],
    requried: true,
  },
});

const accountModel = model("account", accountSchema);

module.exports = accountModel;

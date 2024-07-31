const { Schema, SchemaTypes, model } = require("mongoose");

const engineerSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  rating: {
    type: SchemaTypes.Number,
    required: true,
  },
  count: {
    type: SchemaTypes.Number,
    required: true,
  },
});

const engineerModel = model("engineer", engineerSchema);

module.exports = engineerModel;

const mongoose = require("mongoose");

const { Schema } = mongoose;
const serviceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageFile: {
    type: String,
    required: true,
  },
  servicetype: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("servicesData", serviceSchema);

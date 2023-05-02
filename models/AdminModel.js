const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema({
  type: String,
  userName: String,
  password: String,
  status: String,
  date: String,
  cart: [{ type: Schema.Types.ObjectId, ref: "servicesData" }],
});

module.exports = mongoose.model("adminData", adminSchema);

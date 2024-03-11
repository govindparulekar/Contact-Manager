const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: String,
    contact : String,
    email : String,
    address : String

  }

);
module.exports = mongoose.model("Contact", contactSchema)
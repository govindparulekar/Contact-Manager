const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: String,
    contact : String,
    email : String,
    addr : String

  }

);
module.exports = mongoose.model("Contact", contactSchema)
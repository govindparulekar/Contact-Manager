const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  name: String,
  contact: String,
  email: String,
  addr: String,
});
module.exports = mongoose.model("Contact", contactSchema);

const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String },
  usn: { type: String, uppercase: true },
  email: { type: String },
  phoneno: { type: String },
  branch: { type: String, uppercase: true },
  address: { type: String },
});
const Studentreg = mongoose.model("Studentreg", StudentSchema);
module.exports = Studentreg;

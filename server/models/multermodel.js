const mongoose = require("mongoose");

const Filemulter = new mongoose.Schema({
  file: { type: String },
});

const File = mongoose.model("File", Filemulter);
module.exports = File;

const mongoose = require("mongoose");
const speakerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});
const Speaker = mongoose.model("Speaker", speakerSchema);
module.exports = Speaker;

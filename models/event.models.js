const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    typeOfEvent: {
      type: String,
      enum: ["online", "offline", "both"],
      required: true,
    },
    details: {
      type: String,
    },
    dressCode: {
      type: String,
    },
    ageRestrictions: {
      type: String,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    speakers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Speaker",
        required: true,
      },
    ],
    eventTags: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

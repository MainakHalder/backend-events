const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");
const Speaker = require("./models/speaker.models");
initializeDatabase();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is working");
});

const addSpeaker = async (newSpeaker) => {
  try {
    const speaker = new Speaker(newSpeaker);
    const saveSpeaker = await speaker.save();
    return saveSpeaker;
  } catch (error) {
    console.log("error: ", error);
  }
};

app.post("/speakers", async (req, res) => {
  try {
    const newSpeaker = await addSpeaker(req.body);
    res
      .status(201)
      .json({ message: "Event added successfully", speaker: newSpeaker });
  } catch (error) {
    res.status(500).json({ error: "Failed to add speakers." });
  }
});

const readAllSpeakers = async () => {
  try {
    const allSpeakers = await Speaker.find();
    return allSpeakers;
  } catch (error) {
    throw error;
  }
};

app.get("/speakers", async (req, res) => {
  try {
    const readSpeakers = await readAllSpeakers();
    if (readSpeakers.length) {
      res.json(readSpeakers);
    } else {
      res.status(404).json({ error: "Speakers not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch speakers" });
  }
});

const createData = async (newEvent) => {
  try {
    const event = new Event(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    throw error;
  }
};

app.post("/events", async (req, res) => {
  try {
    const newEvents = await createData(req.body);
    res
      .status(201)
      .json({ message: "Event added successfully", event: newEvents });
  } catch (error) {
    res.status(500).json({ error: "Failed to add events" });
  }
});

const getAllEvents = async () => {
  try {
    const allEvents = await Event.find().populate("speakers");
    return allEvents;
  } catch (error) {
    console.log("error: ", error);
  }
};

app.get("/events", async (req, res) => {
  try {
    const allEvent = await getAllEvents();
    if (allEvent.length) {
      res.json(allEvent);
    } else {
      res.status(404).json({ error: "Events not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

const getEventByTitle = async (eventTitle) => {
  try {
    const eventByTitle = await Event.findOne({ name: eventTitle }).populate(
      "speakers"
    );
    return eventByTitle;
  } catch (error) {
    console.log("Error: ", error);
  }
};

app.get("/events/:eventTitle", async (req, res) => {
  try {
    const eventByTitle = await getEventByTitle(req.params.eventTitle);
    if (eventByTitle) {
      res.status(201).json(eventByTitle);
    } else {
      res.status(404).json({ message: "No event is found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

const updateSpeaker = async (speakerId, updatedSpeaker) => {
  try {
    const updSpeaker = await Speaker.findByIdAndUpdate(
      speakerId,
      updatedSpeaker,
      { new: true }
    );
    return updSpeaker;
  } catch (error) {
    console.log("Error: ", error);
  }
};

app.post("/speakers/:speakerId", async (req, res) => {
  try {
    const updatedSpeaker = await updateSpeaker(req.params.speakerId, req.body);
    if (updatedSpeaker) {
      res.status(200).json({
        message: "Speaker updated successfully",
        speaker: updatedSpeaker,
      });
    } else {
      res.status(404).json({ error: "Speaker not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update Speaker" });
  }
});

const PORT = process.env.PORT || 5800;
app.listen(PORT, () => {
  console.log("The server is running on port: ", PORT);
});

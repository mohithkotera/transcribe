const express = require("express");
const File = require("../models/multermodel");
const fs = require("fs");
const axios = require("axios");
const OpenAI = require("openai");
const multer = require("multer");
require("dotenv").config();
const router = express.Router();

////////////OLD VERSION-4/////////
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

////////////NEW VERSION-4/////////
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const storageEngine = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storageEngine });

router.post("/fileupload", upload.single("audio"), async (req, res) => {
  try {
    const storeFile = await new File({ file: req.file.path });
    storeFile.save();
    if (storeFile) {
      const filepath = fs.createReadStream(storeFile.file);
      const result = await openai.createTranscription(
        filepath,
        process.env.WHISPER_AI_MODEL,
        undefined,
        undefined,
        undefined,
        "en"
      );
      const transcription = result.data.text;

      res.json(transcription);
    } else {
      res.json("Transcription Failed");
    }
  } catch (err) {
    console.log("error", err);
  }
});
module.exports = router;
//////////USING AXIOS///////////
//  const apiUrl = "https://api.openai.com/v1/audio/transcriptions";
//  const response = await axios.post(
//    apiUrl,
//    {
//      filepath,
//      model: "whisper-1",
//    },
//    {
//      headers: {
//        "Content-Type": "multipart/form-data",
//        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//      },
//    }
//  );
//  console.log(response.data.text);
//////////////ANOTHER METHOD////////////
// const apiKey = "your-openai-api-key"; // Replace with your Whisper API key
// const apiUrl = "https://api.openai.com/v1/whisper/recognize";
// const response = await axios.post(
//   apiUrl,
//   {
//     audio: {
//       content: audioFilePath,
//     },
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//     },
//   }
// );

// const transcription = response.data.transcriptions[0].text;
//OPENAI_API_KEY = sk - TI9p1TYfOtTeChk6upG0T3BlbkFJluwW8ySuETD31KLkiDGL;

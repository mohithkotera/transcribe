// import all packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//////create a port numer for connection//////
const PORT = process.env.PORT_NO;

//////middleware/////////
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

///////DB Connection////////

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log("DB Not Connected");
  });

///////connect route//////////

app.use("/", require("./routes/route"));
app.use("/", require("./routes/transcribe"));

////////listen to port ///////////
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

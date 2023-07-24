require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

/*VARIABLES */
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

/* EXPRESS APP */
const app = express();

/* MIDDLEWARS */
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

/* TEST API */
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Dazzle mart server" });
});

/* DB */
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

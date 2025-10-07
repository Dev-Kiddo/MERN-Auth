const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Mongo Failed:", error);
    process.exit(1);
  }
};

app.listen(port, () => {
  console.log(`Server is connected at PORT: ${port}`);
  connectDB();
});

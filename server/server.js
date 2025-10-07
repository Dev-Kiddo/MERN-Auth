const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is connected at PORT: ${port}`);
  console.log("hello");
});

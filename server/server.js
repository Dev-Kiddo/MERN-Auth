import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

// Error handeling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || message,
  });
});

// console.log("Process:", process.env.MONGO_URL);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Mongo Failed:", error);
    process.exit(1);
  }
};
connectDB();

app.listen(port, () => {
  console.log(`Server is connected at PORT: ${port}`);
});

//0 app.get("/", (req,res))

// const root = (req, res) => {
//   console.log("request:", req.requestedTime);

//   res.status(200).json({
//     status: "success",
//     message: "Your Api is working fine!",
//   });
// };

//1 app.get("/", root);
//2 app.route("/").get(root);

// const userRoute = express.Router(); // this is a middleware now
// Why we need to do this? we can simply use app.route() might think, but now we want to seperate these routes into different files. so for that we have to create a seperate router fro each

// app.use("/", userRoute); So here we are using that middleware using app.use()
// userRoute.route("/").get(root);

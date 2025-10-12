import userModel from "../models/userModel.js";
import bcryptjs, { compare } from "bcryptjs";
import { customErrHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// To use our default err handeling in this controller we need to pass the next function here has a third parameter
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);

  if (!username || !email || !password) {
    return res.status(500).json({
      success: false,
      message: "Missing information, All fields required",
    });
  }

  const [existingUser] = await userModel.find({ username, email });

  if (existingUser) {
    return res.status(500).json({
      success: false,
      message: "Entered Details already in use, Please log in or sign up with different credentials",
    });
  }

  try {
    const hashPasssword = await bcryptjs.hash(password, 10);

    const newUser = new userModel({ username, email, password: hashPasssword });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("err:", error);

    // return res.status(404).json({
    //   success: false,
    //   message: "User creation fail",
    //   err: error.message,
    // });

    // Here we are using our default err handeling middleware
    return next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(email, password);

  if (!email || !password) {
    // return res.status(500).json({
    //   success: false,
    //   message: "To sign-in, All fields required",
    // });

    return next(customErrHandler(500, "To sign-in, All fields required"));
  }

  try {
    // lean(), Documents returned from queries with lean option enabled are plain javascript objects
    const user = await userModel.findOne({ email }).lean();

    if (!user) {
      // return res.status(500).json({
      //   success: false,
      //   message: "User not found, please sign up first...",
      // });

      // Err handeling with Custom Error
      return next(customErrHandler(401, "User not found, please sign up first..."));
    }

    const encryptPassword = await bcryptjs.compare(password, user.password);

    if (!encryptPassword) return next(customErrHandler(401, "Wrong Credentials, Please try again"));

    const { password: hashedpassword, ...userDetails } = user;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7h" });

    res.cookie("access_token", token, { maxAge: 7000 * 60 * 60, httpOnly: true });

    res.status(201).json({
      success: true,
      message: "Log in successfully",
      data: userDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const GSignin = async function (req, res, next) {
  console.log("entering...");

  console.log(req.body);
  const { username, email, photoURL } = req.body;

  try {
    const user = await userModel.findOne({ email }).lean();

    console.log("User:", user);

    if (user) {
      // return next(customErrHandler(401, "User not found..."));
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7h" });
      const { password: hashedpassword, ...userDetails } = user;
      res.cookie("access_token", token, { maxAge: 7000 * 60 * 60, httpOnly: true });

      res.status(201).json({
        success: true,
        message: "Log in successfully",
        data: user,
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashPasssword = await bcryptjs.hash(generatedPassword, 10);

      const newUser = new userModel({ username: username + Math.trunc(Math.random() * 50), email, password: hashPasssword, photoURL });

      console.log("newUser:", newUser);

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7h" });
      res.cookie("access_token", token, { maxAge: 7000 * 60 * 60, httpOnly: true });

      res.status(201).json({
        success: true,
        message: "Log in successfully",
        data: newUser,
      });
    }
  } catch (err) {
    next(err);
  }
};

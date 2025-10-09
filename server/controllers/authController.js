import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { customErrHandler } from "../utils/error.js";

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
  // console.log("existingUser:", existingUser);

  if (existingUser) {
    return res.status(500).json({
      success: false,
      message: "Entered Details already in use, Please log in or sign up with different credentials",
    });
  }

  try {
    const hashPasssword = await bcryptjs.hash(password, 10);

    const newUser = new userModel({ username, email, password: hashPasssword });
    // console.log("newUser:", newUser);

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

    // Default Err handeling with Custom Err
    // return next(customErrHandler(405, "Somthing happens"));
  }
};

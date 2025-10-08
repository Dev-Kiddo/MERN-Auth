import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

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
    return res.status(404).json({
      success: false,
      message: "User creation fail",
      err: error.message,
    });
  }
};

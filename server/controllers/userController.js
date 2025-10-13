import { customErrHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
  console.log("All Users");

  res.status(200).json({
    message: "success",
  });
};

export const updateUser = async (req, res, next) => {
  console.log("req_User:", req.user);

  if (req.user.id !== req.params.id) {
    // return res.status(401).json({
    //   success: false,
    //   message: "Please logout and login",
    // });
    return next(customErrHandler(401, "Please logout and login"));
  }

  try {
    let hashPassword;
    if (req.body.password) {
      hashPassword = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username,
          email: req.body.email,
          password: hashPassword,
          photoURL: req.body.photoURL,
        },
        { new: true }
      )
      .lean();

    const { password, ...user } = updatedUser;

    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: user,
    });
  } catch (err) {
    return next(err.message);
  }
};

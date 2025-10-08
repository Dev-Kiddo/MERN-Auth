import userModel from "../models/userModel.js";

const getUsers = async (req, res) => {
  console.log("All Users");

  res.status(200).json({
    message: "success",
  });
};

export default getUsers;

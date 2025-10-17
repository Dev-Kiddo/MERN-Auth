import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.access_token;

  // console.log("accessToken:", accessToken);

  try {
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access Denied, you need to login",
      });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Token Expired, you need to login",
        });
      }

      req.user = user;
    });
  } catch (err) {
    console.log("err", err);
  }

  next();
};

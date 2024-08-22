import jwt from "jsonwebtoken";
import User from "../../models/auth/userModel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No token, user not authorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userDetails = await User.findById(decoded.id).select("-password");

  if (!userDetails) {
    return res
      .status(401)
      .json({ message: "User not found, authorization failed" });
  }

  req.user = userDetails;

  next();
});

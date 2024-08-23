import User from "../../models/auth/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { sendGreetingEmail } from "../../utils/greetingMail.js";

export const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Check if the verification period has expired
    if (user.verificationExpires && new Date() > user.verificationExpires) {
      return res.status(400).json({
        message: "Verification link expired. Please request a new one.",
      });
    }

    // Update the user's verification status and clear expiry
    user.isVerified = true;
    user.verificationExpires = null; // Clear the expiry date
    await user.save();

    // Send success email
    const templateParams = {
      to_name: user.name,
      to_email: user.email,
      verification_link: `${process.env.BASE_URL}/user/get-user`, // Add a link to login page
    };

    await sendGreetingEmail(user.email, templateParams, "verification_success");

    res.status(200).json({
      message:
        "Email verified successfully. Please check your email for further instructions.",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(400).json({
        message: "Verification link expired. Please request a new one.",
      });
    } else if (error.name === "JsonWebTokenError") {
      res.status(400).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

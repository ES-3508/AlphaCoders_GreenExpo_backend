import asyncHandler from "express-async-handler";
import User from "../../models/auth/userModel.js";
import { setTokenCookie } from "../../utils/setTokenCookie.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendMail.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please fill required credentials");
  }

  const exUser = await User.findOne({ email });

  if (exUser) {
    res.status(400);
    throw new Error("User already registered, please login");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const verificationToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  const verification_link = `${process.env.BASE_URL}/user/verify/${verificationToken}`;

  const templateParams = {
    to_name: user.name,
    verification_link: verification_link,
  };

  try {
    await sendEmail(user.email, templateParams);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to send verification email");
  }

  setTokenCookie(user._id, res);

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  res.status(200).json(userWithoutPassword);
});

//user login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404);
    throw new Error("please provide required credentials");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("user not found please register first");
  }
  if (!user.isVerified) {
    res.status(400);
    throw new Error(
      "user isnt verified please verify user and login to your account again."
    );
  }

  //this will check the user password and user entered password is matching
  if (user && (await user.checkedPassword(password))) {
    setTokenCookie(user._id, res);
    //delete password before sending to response to improve security
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(200).json(userWithoutPassword);
  } else {
    res.status(400);
    throw new Error("user credeantials not match");
  }
});

export const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id; //we can get user id from our middleware
  if (!userId) {
    res.status(404);
    throw new Error("authorization failed please login again");
  }
  const userDetails = await User.findById(userId).select("-password");

  if (!userDetails.isVerified) {
    res.status(400);
    throw new Error(
      "user isn't verified please verify user email and login to your account."
    );
  }
  if (!userDetails) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json(userDetails);
});

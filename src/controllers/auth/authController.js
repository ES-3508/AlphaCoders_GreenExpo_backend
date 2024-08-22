import asyncHandler from "express-async-handler";
import User from "../../models/auth/userModel.js";
import { setTokenCookie } from "../../utils/setTokenCookie.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(404);
    throw new Error("please fill required credentials");
  }

  const exUser = await User.findOne({ email });

  if (exUser) {
    res.status(400);
    throw new Error("user already registered please login");
  }

  const user = new User({
    name,
    email,
    password,
  });

  await user.save();
  setTokenCookie(user._id, res);
  res.status(200).json(user);
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
  //this will check the user password and user entered password is matching
  if (user && (await user.checkedPassword(password))) {
    setTokenCookie(user._id, res);
    res.status(200).json(user);
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
  const userDetails = await User.findById(userId);
  if (!userDetails) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json(userDetails);
});

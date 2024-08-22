import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

//this function send token to our clint side i mean clint web browser we need to call this function in login and register
export const setTokenCookie = asyncHandler((id, res) => {
  const payload = { id };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // expires in 24 hours
    httpOnly: true, // Makes the cookie accessible only by the  server to avoid attacks
    secure: process.env.NODE_ENV === "production", //  cookie is sent over HTTPS only in production
    sameSite: "Strict", //  cookie is sent only with requests from the same site
  });
});

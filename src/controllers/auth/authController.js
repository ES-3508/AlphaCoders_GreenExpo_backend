import asyncHandler from "express-async-handler";

export const hi = asyncHandler(async (req, res) => {
  res.send("hi green expo backend");
});

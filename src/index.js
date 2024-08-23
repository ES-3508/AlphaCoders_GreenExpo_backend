import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ConnectMongoDb } from "./config/database.js";
import authRoutes from "./routes/auth/authRoutes.js";
import { errorHandler } from "./middlewares/error/errorHandler.js";

//initialize app
const app = express();

//define port
const port = process.env.PORT || 3001;

//inbuilt middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//connecting to database
ConnectMongoDb();


//health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

//api routes
app.use("/user", authRoutes);

//custom error handler
app.use(errorHandler);

//server initialize
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
